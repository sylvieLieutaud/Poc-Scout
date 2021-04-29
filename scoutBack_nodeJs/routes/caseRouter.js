
  const caseController = require("../controllers/caseController.js");

  var router = require("express").Router();

  // Create a new case
  router.post("/", caseController.create);

  // Retrieve all cases
  router.get("/", caseController.findAll);

  // Retrieve case with status(true)
  router.get("/actived", caseController.findAllActived);

  // Retrieve avec un flitre
  router.get("/filtre", caseController.findFiltre);


  // Retrieve a single case with id
  router.get("/:id", caseController.findOne);

  // Update a case with id
  router.put("/:id", caseController.update);

  // Delete a case with id
  router.delete("/:id", caseController.delete);

 // find case by userId
 router.get("/user/:id", caseController.findByUser);

//  // Retrieve avec un idUser
//  router.get("/user", caseController.findByUser);


  module.exports = router;
