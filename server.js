const express = require('express');
const path = require('path');
const { get } = require('http');
const  {uuid} = require('uuidv4');

const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomItem = db[Math.floor(Math.random() * db.length)];
  res.json(randomItem);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id - 1]);
});



app.post('/testimonials', (req, res) => {
  const payload = {
    id: uuid(),
    author: req.body.author,
    text: req.body.text
  };
  db.push(payload);
  res.json({message:'Ok'});
});


app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text,
  
  }
  db[req.params.id - 1] = newTestimonial;
  res.json({message:'Ok'});
});



app.delete('/testimonials/:id', (req, res) => {
  db.splice(db[req.params.id], 1);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});



app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});