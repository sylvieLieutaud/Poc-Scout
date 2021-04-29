
  const userController = require("../controllers/userController.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", userController.create);

  // Retrieve all user
  router.get("/", userController.findAll);

  // Retrieve users with status(true)
  router.get("/actived", userController.findAllActived);

  // Retrieve users with status(true)
  router.get("/email", userController.findByEmail);

  // Retrieve a single user with id
  router.get("/:id", userController.findOne);

  // Update a user with id
  router.put("/:id", userController.update);

  // Delete a user with id
  router.delete("/:id", userController.delete);

  // login
  router.get("/email", userController.findByEmail);


  
  module.exports = router;
