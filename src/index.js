const express = require("express");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

//const cors = require("cors");
//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


/**
 * Database Setup ==> ORM.
 */
const dbConfig = require("./config/db.js");
const Sequelize = require("sequelize");

//MSSQL
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   port: dbConfig.PORT,
//   dialect: dbConfig.dialect,
//   // pool: {
//   //   max: dbConfig.pool.max,
//   //   min: dbConfig.pool.min,
//   //   acquire: dbConfig.pool.acquire,
//   //   idle: dbConfig.pool.idle,
//   // },
// });

//sqllite3
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  define: {
    freezeTableName: true
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * ORM Mapping.
 */
db.tutorial = require("./tutorial/model.js")(sequelize, Sequelize);
db.user = require("./user/model.js")(sequelize, Sequelize);

module.exports = db;

// drop and re-sync db the table if it already exists ==> force : true
sequelize.sync({ force: false,   /* logging: false */ }).then(() => {
});

/**
 * Routes.
 */
require("./tutorial/route")(app);
require("./user/route")(app);

// set port, listen for requests
//const PORT = process.env.PORT || 8080;
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});