
//const authUtil = require("../middlewares/authJWT.js").checkToken;
const router = require("express").Router();

module.exports = (app) => {
  var controller = require("../controllers/user.js");

  //router.post("/", authUtil, controller.create);
  router.post("/", controller.create);
  router.get("/", controller.findAll);
  router.get("/:id", controller.findOne);
  //router.get("/published", controller.findAllPublished);
  router.put("/:id", controller.update);
  router.delete("/", controller.deleteAll);
  router.delete("/:id", controller.delete);

  app.use("/api/user", router);
};