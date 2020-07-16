const express = require('express');
const router = express.Router();
const db = require('./../db');
const  {uuid} = require('uuidv4');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id - 1]);
});



router.route('/seats').post((req, res) => {
  const {day, seat, client, email} = req.body;
  const newSeat = {
    id: uuid(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  db.seats.push(newSeat);
  res.json({message:'Ok'});
});


router.route('/concerts/:id').put((req, res) => {
  const {day, seat, client, email} = req.body;
  const updateSeat = {
    id: req.params.id,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  
  }
  db.seats[req.params.id - 1] = updateSeat;
  res.json({message:'Ok'});
});



router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(db.seats[req.params.id], 1);
  res.json({ message: 'OK' });
});

module.exports = router;