
const db = require("../index.js");
const User = db.user;

const jwt = require("../config/jwt.js");
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.post("/login", async (req, res) => {
    try {
      const { id, password } = req.body;
      if (!(id && password)) {
        res.status(400).send("All input is required");
      }
    
      User.findByPk(id)
      .then((user) => {
        if(user) {
          if(bcrypt.compareSync(password, user.password)) {
            const jwtToken = jwt.sign(user);
            return res.status(200).send({ result : "success", message : "login success", token: jwtToken.token });
          } else {
            res.status(500).send({ result: "error", message: "Password do not match." });
          }
        } else {
          res.status(500).send({ result: "error", message: "User is not Exist." });
        }
      })
      .catch((err) => { res.status(500).send({ message: err.message || "Error retrieving User with id=" + id }); });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
};
