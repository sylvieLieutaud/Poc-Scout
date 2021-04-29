const bd = require("../models/bd");
const User= require('../models/userModel');
const { Op } = require("sequelize");

// Create and Save a new user
exports.create = (req, res) => {
   // Validate request
//    if (!req.body.title) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//     }
    // Create a user
  const user = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
    status: req.body.status ? req.body.status : true,
    idOrg: req.body.idOrg
  };

  // Save user in the database
  User.create(user)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Some error occurred while creating the User"
      });
    });
}

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  
    User.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findOne( {where: {id: id} })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving user with id=" + id
        });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving user with id=" + id
    });
  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({where: {id: id} })
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving user with id=" + id
    });
  });
};

// Find all actived Users
exports.findAllActived = (req, res) => {
  User.findAll({where: {status: true} })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving user with status=" + id
      });
    });
  };
  exports.findByEmail = (req, res) => {
    //recuperer le donnée qui est passer en params (par Angular/ service)
    const email = req.query.email;
    var condition = { email: {[Op.eq]: `${email}` } };
    User.findAll( { where: condition })
    .then(data => {
      res.status(200).json(data);
    }).catch(err => { 
      res.status(500).json({
      message:
      err.message || "Some error occurred while retrieving cases."
      });
    });
  };


// exports.login = (req, res, next) => {
//   User.findOne({
//       mail: req.body.mail
//   }).then(data => {
//     res.status(200).json(data);
//   })
//   // .then((result) => {
//   //     bcrypt.compare(req.body.password, result.password).then((isValid) => {
//   //         if (isValid) {
//   //             jwt.sign(
//   //                 { mail: result.mail },
//   //                 process.env.TOKEN_JWT,
//   //                 { expiresIn: '24h' },
//   //                 (error, token) => {
//   //                     console.log(token);
//   //                     console.log(error);
//   //                     res.status(200).json(token);
//   //                 });
//   //         };
//   //     });
//   // })
//   .catch(error => {
//       res.status(400).json(error);
//   });
// };
exports.findByEmail = (req, res) => {
  
  //recuperer le donnée qui est passer en params (par Angular/ service)
  const email = req.query.email;
  console.log('le mail : ' + email);
  var condition = { email: {[Op.startsWith]: `${email}` } };
  User.findAll( { where:  condition})
  .then(data => {
    
    res.status(200).json(data)
  }).catch(err => { 
    res.status(500).json({
    message:
    err.message || "Some error occurred while retrieving the user email."
    });
  });
};
