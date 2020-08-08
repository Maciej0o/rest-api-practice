const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getSingle);
router.post('/concerts', ConcertController.postConc);
router.put('/concerts/:id', ConcertController.updateConc);
router.delete('/concerts/:id', ConcertController.deleteConc);


module.exports = router;