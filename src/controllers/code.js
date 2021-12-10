const db = require("../index.js");
const User = db.user;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');
const moment = require("moment");

exports.create = (req, res) => {
  const { user_id, name, password, email, mobile, crewYN, code_auth } = req.body;
  
  
  //validation 처리!!!!!!!!!!!!
  if (!(user_id && password)) {
    return res.status(400).send({ message: "Data not formatted properly" });
  }

  const user = {
    user_id: user_id,
    password: password,
    name: name,
    email: 'test@test.com',
    mobile: '010-1234-5678',
    crewYN: 'N',
    code_auth : 'USER',
    updateDt : moment().format('YYYY-MM-DD HH:mm:ss'),
    createDt : moment().format('YYYY-MM-DD HH:mm:ss')
  };

  bcrypt.hash(user.password, 10, function(err, hash) {
    user.password = hash;

    User.create(user)
    .then((data) => { res.status(200).send(data); })
    .catch((err) => { res.status(500).send({  message: err.message || "Some error occurred while creating the User." }); });
  });
};

exports.findAll = (req, res) => {
  const { name } = req.query;

  var condition = name ? { name: { [Op.like]: "%" + name + "%" } } : null;

  User.findAll({ where: condition })
  .then((data) => { res.status(200).send(data); })
  .catch((err) => { res.status(500).send({ message: err.message || "Some error occurred while retrieving Users.", }); });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  
  User.findByPk(id)
  .then((data) => { res.status(200).send(data); })
  .catch((err) => { res.status(500).send({ message: err.message || "Error retrieving User with id=" + id }); });
};

exports.update = (req, res) => {
  const { id } = req.params;

  User.update(req.body, { where: { id: id } })
  .then((num) => {
    if (num == 1) {
      User.findByPk(id)
      .then((data) => { res.status(200).send(data); })
      .catch((err) => { res.status(500).send({ message: err.message || "Error retrieving User with id=" + id }); });
    }
  })
  .catch((err) => {
    res.status(500).send({ message: err.message || "Error updating User with id=" + id });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  User.destroy({ where: { id: id } })
  .then((num) => {
    if (num == 1) { res.status(200).send("User was deleted successfully!"); }
  })
  .catch((err) => { res.status(500).send({ message: err.message || "Could not delete User with id=" + id }); });
};

exports.deleteAll = (req, res) => {
  User.destroy({ where: {}, truncate: false, })
  .then((nums) => { res.status(200).send({ message: nums + "Users were deleted successfully!" }); })
  .catch((err) => { res.status(500).send({ message: err.message || "Some error occurred while removing all Users." }); });
};

// exports.findAllPublished = (req, res) => {
//   User.findAll({ where: { published: true } })
//   .then((data) => {
//     res.send(data);
//   })
//   .catch((err) => {
//     res.status(500).send({
//       message: err.message || "Some error occurred while retrieving Users.",
//     });
//   });
// };
