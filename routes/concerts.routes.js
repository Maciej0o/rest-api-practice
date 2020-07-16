const express = require('express');
const router = express.Router();
const db = require('./../db');
const  {uuid} = require('uuidv4');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts[req.params.id - 1]);
});



router.route('/concerts').post((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const newConcert = {
    id: uuid(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  };
  db.concerts.push(newConcert);
  res.json({message:'Ok'});
});


router.route('/concerts/:id').put((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const updateConcert = {
    id: req.params.id,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  
  }
  db.concerts[req.params.id - 1] = updateConcert;
  res.json({message:'Ok'});
});



router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(db.concerts[req.params.id], 1);
  res.json({ message: 'OK' });
});

module.exports = router;