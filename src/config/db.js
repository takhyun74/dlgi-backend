
module.exports = {
  dialect: "mssql",
  HOST: "localhost",
  PORT: "1433",
  USER: "sa",
  PASSWORD: "1",
  DB: "test1",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

