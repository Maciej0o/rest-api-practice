const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
}

exports.getSingle = async (req, res) => {
    try {
      const con = await Concert.findById(req.params.id);
      if(!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.postConc = async (req, res) => {
    try {
      const { perfomer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ perfomer: perfomer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.updateConc = async (req, res) => {
    const { perfomer, genre, price, day, image } = req.body;
    try {
      const con = await(Concert.findById(req.params.id));
      if(con) {
        con.perfomer = perfomer;
        con.genre = genre;
        con.price = price;
        con.day = day;
        con.image = image;
        await con.save();
        res.json({ updatedElement: con });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.deleteConc = async (req, res) => {
    try {
      const con = await(Concert.findById(req.params.id));
      if(con) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ deletedElement: con });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }; 