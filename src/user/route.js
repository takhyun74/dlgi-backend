module.exports = (app) => {
  const controller = require("./controller.js");

  var router = require("express").Router();

  router.post("/", controller.create);
  router.get("/", controller.findAll);
  router.get("/:id", controller.findOne);
  router.get("/published", controller.findAllPublished);
  router.put("/:id", controller.update);
  router.delete("/", controller.deleteAll);
  router.delete("/:id", controller.delete);

  app.use("/api/user", router);
};
