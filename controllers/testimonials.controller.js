const Testimonial = require('../models/testimonial.model');

exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const test = await Testimonial.findOne().skip(rand);
      if(!test) res.status(404).json({ message: 'Not found' });
      else res.json(test);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getSingle = async (req, res) => {
    try {
      const test = await Testimonial.findById(req.params.id);
      if(!test) res.status(404).json({ message: 'Not found' });
      else res.json(test);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.postTest = async (req, res) => {
    try {
      const { author, text } = req.body;
      const newTestimonial = new Testimonial({ author: author, text: text });
      await newTestimonial.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.updateTest = async (req, res) => {
    const { author, text } = req.body;
    try {
      const test = await(Testimonial.findById(req.params.id));
      if(test) {
        test.author = author;
        test.text = text;
        await test.save();
        res.json({ updatedElement: test });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.deleteTest = async (req, res) => {
    try {
      const test = await(Testimonial.findById(req.params.id));
      if(test) {
        await Testimonial.deleteOne({ _id: req.params.id });
        res.json({ deletedElement: test });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };