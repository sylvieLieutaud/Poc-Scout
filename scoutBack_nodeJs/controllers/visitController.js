const bd = require("../models/bd");
const Visit = require('../models/visitModel');

// Create and Save a new visit
exports.create = (req, res) => {
  // Create a visit
  const visitObj = {
    visitName: req.body.visitName,
    idCase: req.body.idCase,
    idUser:req.body.idUser,
    status: req.body.status ? req.body.status : true,
  };
console.log(visitObj);
  // Save visit in the database
  Visit.create(visitObj)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json({
      message:
        "Some error occurred while creating the visit"
    });
  });
}

// Retrieve all visits from the database.
exports.findAll = (req, res) => {
    // const title = req.body.lastName;
    // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;{ where: condition }
    // pagination des données
    Visit.findAll({
      // pagination des données 
      limit: 100,
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
    Visit.findOne( {where: {id: id} })
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
  Visit.update(req.body, {where: {id: id} })
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
  Visit.destroy({where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving visit with id=" + id
    });
  });
};

// Find all visits of one user
exports.findByUser = (req, res) => {
  let idUser = req.params.id;
  console.log(idUser);
  Visit.findAll({where: {idUser: idUser} })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving visit with status=" + id
      });
    });
}