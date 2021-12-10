const express = require("express");
const app = express();

const cors = require("cors");

const allowlist = ['http://localhost:3000'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
  if (isDomainAllowed) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}
app.use(cors(corsOptionsDelegate));

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
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
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
 * ORM Mapping and Foreign Key Setting.
 * 1. foreignKey 설정을 하지 않으면, 자동으로 테이블명 + Id 컬럼을 생성
 * 2. foreignKey 설정 시 두 모델에서 동일한 설정이 필요, 하나의 모델에서만 정의하는 경우 자동으로 컬럼을 생성하여 중복 이슈가 일어남
 */
db.user = require("./models/user.js")(sequelize, Sequelize);
db.code = require("./models/code.js")(sequelize, Sequelize);
db.application = require("./models/application.js")(sequelize, Sequelize);
db.applicationList = require("./models/applicationList.js")(sequelize, Sequelize);

db.code.hasMany(db.user, {
  foreignKey: 'code_auth',
  allowNull: false,
  constraints: true,
  onDelete: 'NO ACTION'
});
db.user.belongsTo(db.code, {
  foreignKey: 'code_auth',
  allowNull: false
});

db.code.hasMany(db.applicationList, {
  foreignKey: 'code_apply_path',
  allowNull: false,
  constraints: true,
  onDelete: 'NO ACTION'
});
db.application.hasMany(db.applicationList, {
  foreignKey: 'application_idx',
  allowNull: false,
  constraints: true,
  onDelete: 'NO ACTION'
});
db.user.hasMany(db.applicationList, {
  foreignKey: 'user_id',
  allowNull: false,
  constraints: true,
  onDelete: 'NO ACTION'
});

db.applicationList.belongsTo(db.code, {
  foreignKey: 'code_apply_path',
  allowNull: false
});
db.applicationList.belongsTo(db.application, {
  foreignKey: 'application_idx',
  allowNull: false
});
db.applicationList.belongsTo(db.user, {
  foreignKey: 'user_id',
  allowNull: false
});

module.exports = db;

// drop and re-sync db the table if it already exists ==> force : true
sequelize.sync({ force: false, /* logging: false */ }).then(() => {
});

/**
 * Routes.
 */
require("./routes/login")(app);
require("./routes/user")(app);
require("./routes/tutorial")(app);




// set port, listen for requests
//const PORT = process.env.PORT || 8080;
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});