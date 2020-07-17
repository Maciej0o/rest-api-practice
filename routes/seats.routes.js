const express = require('express');
const router = express.Router();
const db = require('./../db');
const  {uuid} = require('uuidv4');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(item => item.id == req.params.id));
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
  if (
    db.seats.some(seat => seat.day == newSeat.day && seat.seat == newSeat.seat) ){
      res.json({ message: 'The slot is already taken. You have to choose another slot.'});
    }
    else {
      db.seats.push(newSeat);
      res.json({message: 'Ok'});
    }
});


router.route('/seats/:id').put((req, res) => {
  const {day, seat, client, email} = req.body;
  const updateSeat = {
    id: req.params.id,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  
  }
  const opinion = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(opinion);
  db.seats[index] = updateSeat; 
  res.json({message:'Ok'});
});



router.route('/seats/:id').delete((req, res) => {
  const opinion = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(opinion);
  db.seats.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;