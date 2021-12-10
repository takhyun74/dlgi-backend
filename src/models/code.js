
module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define("tbl_code", {
    code: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true
    },
    p_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    code_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
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

  return Code;
};