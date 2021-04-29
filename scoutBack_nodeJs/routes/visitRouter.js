
  const visitController = require("../controllers/visitController.js");

  var router = require("express").Router();

  // Create a new visit
  router.post("/", visitController.create);

  // Retrieve all visit
  router.get("/", visitController.findAll);

  // Retrieve  visits with  status(true)
  router.get("/user/:id", visitController.findByUser);

  // Retrieve a single visit with id
  router.get("/:id", visitController.findOne);

  // Update a visit with id
  router.put("/:id", visitController.update);

  // Delete a visit with id
  router.delete("/:id", visitController.delete);

  module.exports = router;
