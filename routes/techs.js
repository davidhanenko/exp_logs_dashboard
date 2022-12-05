const express = require('express');
const router = express.Router();

const Tech = require('../models/tech');
// fetch
router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find({});
    res.json(techs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// add new
router.post('/', async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const newTech = new Tech({
      firstName,
      lastName,
    });

    const tech = await newTech.save();
    res.json(tech);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// delete
router.delete('/:id', async (req, res) => {
  try {
    await Tech.findByIdAndRemove(req.params.id);
    res.json();
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
