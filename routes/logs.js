const express = require('express');
const router = express.Router();

const Log = require('../models/log');

// get all logs
router.get('/', async (req, res) => {
  if (req.query.q) {
    let regex = new RegExp(req.query.q, 'gi');
    try {
      const logs = await Log.find({
        message: regex,
      });
      res.json(logs);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    try {
      const logs = await Log.find({});
      res.json(logs);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
});

// add new log
router.post('/', async (req, res) => {
  const { message, attention, tech } = req.body;

  try {
    const newLog = new Log({
      message,
      attention,
      tech,
      date: new Date(),
    });

    const log = await newLog.save();

    res.json(log);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// update log
router.put('/:id', async (req, res) => {
  const { message, attention, tech } = req.body;

  const logFields = {};
  logFields.message = message;
  logFields.attention = attention;
  logFields.tech = tech;
  logFields.date = new Date();

  try {
    const log = await Log.findByIdAndUpdate(req.params.id, {
      $set: logFields,
    });

    res.json(log);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// delete log
router.delete('/:id', async (req, res) => {
  try {
    await Log.findByIdAndRemove(req.params.id);
    res.json();
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
