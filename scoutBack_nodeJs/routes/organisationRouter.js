
  const orgController = require("../controllers/organisationController.js");

  var router = require("express").Router();

  // Create a new visit
  router.post("/", orgController.create);

  // Retrieve all visit
  router.get("/", orgController.findAll);


  // Retrieve  visits with  status(true)
  router.get("/actived", orgController.findAllActived);

  // Retrieve a single visit with id
  router.get("/:id", orgController.findOne);

  // Update a visit with id
  router.put("/:id", orgController.update);

  // Delete a visit with id
  router.delete("/:id", orgController.delete);

  module.exports = router;
