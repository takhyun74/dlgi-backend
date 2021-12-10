module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define("tbl_application", {
    idx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    memo: {
      type: DataTypes.TEXT,
      allowNull: true
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

  return Application;
};