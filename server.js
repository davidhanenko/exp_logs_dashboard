if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/techs', require('./routes/techs'));
app.use('/api/logs', require('./routes/logs'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    )
  );
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server started on port: ${PORT}`)
);
