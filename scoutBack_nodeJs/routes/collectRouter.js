
  const collectController = require("../controllers/collectController.js");

  var router = require("express").Router();

  // Create a new collect
  router.post("/", collectController.create);

  // Retrieve all collect
  router.get("/", collectController.findAll);

  // Retrieve  collects with  status(true)
  router.get("/actived", collectController.findAllActived);

  // Retrieve a single collect with id
  router.get("/:id", collectController.findOne);

  // Update a collect with id
  router.put("/:id", collectController.update);

  // Delete a collect with id
  router.delete("/:id", collectController.delete);

  module.exports = router;
