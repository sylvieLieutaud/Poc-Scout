const bd = require("../models/bd");
const Organisation = require('../models/organisationModel');

// Create and Save a new visit
exports.create = (req, res) => {
    // Create a visit
  const orgObj = {
    orgName: req.body.orgName,
    orgCity: req.body.orgCity,
    status: req.body.status ? req.body.status : true,
  };

    // Save visit in the database
    Organisation.create(orgObj)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Some error occurred while creating the organisation"
      });
    });
}

// Retrieve all visits from the database.
exports.findAll = (req, res) => {
    // const title = req.body.lastName;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;{ where: condition }
    // pagination des données
    Organisation.findAll({
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
            err.message || "Some error occurred while retrieving visits."
        });
      });
};

// Find a single visit with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Organisation.findOne( {where: {id: id} })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving visit with id=" + id
        });
      });
};

// Update a visit by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Organisation.update(req.body, {where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving visit with id=" + id
    });
  });
};

// Delete a visit with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Organisation.destroy({where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving visit with id=" + id
    });
  });
};

// Find all actived visits
exports.findAllActived = (req, res) => {
  Organisation.findAll({where: {status: true} })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving visit with status=" + id
      });
    });
}