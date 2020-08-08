const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getSingle = async (req, res) => {
    try {
      const seat = await Seat.findById(req.params.id);
      if(!seat) res.status(404).json({ message: 'Not found' });
      else res.json(seat);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.postSeat = async (req, res) => {
    try {
      const { day, seat, client, email } = req.body;
      const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.updateSeat = async (req, res) => {
    const { day, seatNum, client, email } = req.body;
    try {
      const seat = await(Seat.findById(req.params.id));
      if(seat) {
        seat.day = day;
        seat.seatNum = seatNum;
        seat.client = client;
        seat.email = email;
        await seat.save();
        res.json({ updatedElement: seat });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.deleteSeat = async (req, res) => {
    try {
      const seat = await(Seat.findById(req.params.id));
      if(seat) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json({ deletedElement: seat });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }; 