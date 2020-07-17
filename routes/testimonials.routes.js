const express = require('express');
const router = express.Router();
const db = require('./../db');
const  {uuid} = require('uuidv4');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomItem = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(randomItem);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});



router.route('/testimonials').post((req, res) => {
  const payload = {
    id: uuid(),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(payload);
  res.json({message:'Ok'});
});


router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  
  }
  const opinion = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials[index] = newTestimonial;

  res.json({message:'Ok'});
});



router.route('/testimonials/:id').delete((req, res) => {
  const opinion = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;