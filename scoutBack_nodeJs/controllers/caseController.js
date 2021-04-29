const bd = require("../models/bd");
const Case = require('../models/caseModel');
const { Op } = require("sequelize");

// Create and Save a new case
exports.create = (req, res) => {
    // Create a case
  const caseObj = {
    caseName: req.body.caseName,
    caseNumber: req.body.caseNumber,
    status: req.body.status ? req.body.status : true,
    idUser: req.body.idUser 
  };

  // Save case in the database
  Case.create(caseObj)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Some error occurred while creating the Case"
      });
    });
}

// Retrieve all cases from the database.
exports.findAll = (req, res) => {
  Case.findAll().then(data => {
    res.status(200).json(data)
  })
  .catch(err => { 
    res.status(500).json({
    message:
    err.message || "Some error occurred while retrieving cases."
    });
  });
};
exports.findFiltre = (req, res) => {
  var listCase=[];
  //recuperer le donnée qui est passer en params (par Angular/ service)
  const caseName = req.query.caseName;
  var condition = { caseName: {[Op.startsWith]: `${caseName}` } };
  Case.findAll( { where: condition })
  .then(data => {
    data.forEach(element=>{
            var exCase ={
              "id": element.id,
              "caseName": element.caseName,
              "caseNumber":element.caseNumber
            };
            listCase.push(exCase);
          })
          console.log(listCase);
    res.status(200).json(listCase)
  }).catch(err => { 
    res.status(500).json({
    message:
    err.message || "Some error occurred while retrieving cases."
    });
  });
};

// Find a single case with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Case.findOne( {where: {id: id} })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving Case with id=" + id
        });
      });
};

// Update a case by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Case.update(req.body, {where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving case with id=" + id
    });
  });
};

// Delete a case with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Case.destroy({where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving case with id=" + id
    });
  });
};

// Find all actived cases
exports.findAllActived = (req, res) => {
  Case.findAll({where: {status: true} })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving case with status= true"
      });
    });
}

// find cases's user by id
exports.findByUser = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  Case.findAll({where: {idUser: userId} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving case's user where id is =" + userId
    });
  });
};

// *******************************
// exports.findByUser = (req, res) => {
//   
//   //recuperer le donnée qui est passer en params (par Angular/ service)
//   const idUser = req.params.id;
//   console.log(idUser);
//   var condition = { idUser: {[Op.eq]: `${idUser}` } };
//   Case.findAll( {where: condition })
//   .then(data => {
//     res.status(200).json(data);
//   })
//   .catch(err => {
//   res.status(500).json({
//   message: "Error retrieving case's user where id is =" + idUser
//   });
//   });
// };

