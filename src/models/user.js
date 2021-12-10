
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("tbl_user", {
    user_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    mobile: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    crewYN: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE
    },
    updateDt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createDt: {
      type: DataTypes.DATE
    }
  }, {
    charset: "utf8",
    timestamps: true,
    createdAt: false,
    updatedAt: false
  });

  return User;
};