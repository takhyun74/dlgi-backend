module.exports = (sequelize, DataTypes) => {
  const ApplicationList = sequelize.define("tbl_application_list", {
    idx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    crewYN: {
      type: DataTypes.CHAR(1),
      allowNull: false
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
    updatedAt: false,
  });

  return ApplicationList;
};