const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getSingle);
router.post('/testimonials', TestimonialController.postTest);
router.put('/testimonials/:id', TestimonialController.updateTest);
router.delete('/testimonials/:id', TestimonialController.deleteTest);

module.exports = router;