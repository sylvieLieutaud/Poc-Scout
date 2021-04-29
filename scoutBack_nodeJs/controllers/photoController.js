const bd = require("../models/bd");
const Photo = require('../models/photoModel');
const { Op } = require("sequelize");

// Create and Save a new photo
exports.create = (req, res) => {
    // Create a photo
  const photoObj = {
    fileName: req.body.fileName,
    photoURL: req.body.photoURL,
    idCollect: req.body.idCollect,
    status: req.body.status ? req.body.status : true,
  };

  // Save photo in the 
  Photo.create(photoObj)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Some error occurred while creating the photo"
      });
    });
}

// Retrieve all photos from the database.
exports.findAll = (req, res) => {
    //recuperer le donnée qui est passer en params (par Angular/ service)
  const photoName = req.query.photoName;
  var condition = { photoName: {[Op.startsWith]: `${photoName}` } };
  Photo.findAll( { where: condition })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => { 
      res.status(500).json({
      message:
      err.message || "Some error occurred while retrieving photos."
      });
    });
};

// Find a single photo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Photo.findOne( {where: {id: id} })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving photo with id=" + id
        });
      });
};

// Update a photo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Photo.update(req.body, {where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving photo with id=" + id
    });
  });
};

// Delete a photo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Photo.destroy({where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving photo with id=" + id
    });
  });
};

// Find all actived photos
exports.findAllActived = (req, res) => {
  Photo.findAll({where: {status: true} })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving photo with status= true"
      });
    });
}