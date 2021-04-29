
  const photoController = require("../controllers/photoController.js");

  var router = require("express").Router();

  // Create a new photo
  router.post("/", photoController.create);

  // Retrieve all photos
  router.get("/", photoController.findAll);

  // Retrieve photo with status(true)
  router.get("/actived", photoController.findAllActived);

  // Retrieve a single photo with id
  router.get("/:id", photoController.findOne);

  // Update a photo with id
  router.put("/:id", photoController.update);

  // Delete a photo with id
  router.delete("/:id", photoController.delete);

  module.exports = router;
