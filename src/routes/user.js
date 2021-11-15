module.exports = (app) => {
  const userController = require("../controllers/user.js");

  var router = require("express").Router();

  router.post("/", userController.create);
  router.get("/", userController.findAll);
  router.get("/:id", userController.findOne);
  router.get("/published", userController.findAllPublished);
  router.put("/:id", userController.update);
  router.delete("/", userController.deleteAll);
  router.delete("/:id", userController.delete);

  app.use("/api/user", router);
};