const authUtil = require("../middlewares/auth.js").checkToken;

module.exports = (app) => {
  const tutorialController = require("../controllers/tutorial.js");

  var router = require("express").Router();

  router.post("/", tutorialController.create);
  router.get("/", tutorialController.findAll);
  router.get("/:id", authUtil, tutorialController.findOne);
  router.get("/published", tutorialController.findAllPublished);
  router.put("/:id", tutorialController.update);
  router.delete("/", tutorialController.deleteAll);
  router.delete("/:id", tutorialController.delete);

  app.use("/api/tutorial", router);
};
