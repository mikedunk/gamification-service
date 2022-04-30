"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { dbo } = require("../src/config/constants");
const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

class Game extends Model {}

module.exports = (sequelize, DataTypes) => {
  Game.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      additional_info: {
        type: DataTypes.TEXT,
      },
      resource_link: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      durationInDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "games",
      paranoid: true,
    }
  ).associate = (models) => {
    Game.hasMany(models.SubGame, { foreignKey: "game_id" });
  };
  return Game;
};
