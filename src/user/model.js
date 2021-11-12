module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      //validate: {
      //  isEmail: true,
      //},
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    updateDt: {
      type: DataTypes.DATE
    },
    createDt: {
      type: DataTypes.DATE
    }
  }, {
    charset: "utf8",
    timestamps: false,
  });

  return User;
};