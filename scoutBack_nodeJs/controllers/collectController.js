const bd = require("../models/bd");
const Collect = require('../models/collectModel');
const { Op } = require("sequelize");

// Create and Save a new collect
exports.create = (req, res) => {
    // Create a collect
  const collectObj = {
    gpsX: req.body.gpsX,
    gpsY: req.body.gpsY,
    text: req.body.text,
    audioURL: req.body.audioURL,
    videoURL: req.body.videoURL,
    status: req.body.status ? req.body.status : true,
    idVisit: req.body.idVisit,
  };

    // Save collect in the database
    Collect.create(collectObj)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Some error occurred while creating the collect"
      });
    });
}

// Retrieve all collects from the database.
exports.findAll = (req, res) => {
    // const title = req.body.lastName;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;{ where: condition }
    // pagination des données
    Collect.findAll({
      limit: 3,
      offset: 0,
      order: [
        ['updatedAt', 'DESC'],
    ], 
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving Collects."
        });
      });
};

// Find a single Collect with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Collect.findOne( {where: {id: id} })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving Collect with id=" + id
        });
      });
};

// Update a Collect by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Collect.update(req.body, {where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving Collect with id=" + id
    });
  });
};

// Delete a collect with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Collect.destroy({where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving collect with id=" + id
    });
  });
};

// Find all actived collects
exports.findAllActived = (req, res) => {
  Collect.findAll({where: {status: true} })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving collect with status=" + id
      });
    });
}