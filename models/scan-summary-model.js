"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { dbo } = require("../src/config/constants");
const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

class ScanSummary extends Model {}

module.exports = (sequelize, DataTypes) => {
  ScanSummary.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subgame_id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
      },
      number_of_scans: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      timeLastScanned: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      tableName: "scan_summary",
      timestamps: false,
    }
  ).associate = (models) => {
    ScanSummary.belongsTo(models.SubGame, { foreignKey: "subgame_id" });
  };
  return ScanSummary;
};
