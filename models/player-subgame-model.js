"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { dbo } = require("../src/config/constants");
const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

class PlayerSubGame extends Model {}

module.exports = (sequelize, DataTypes) => {
  PlayerSubGame.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sub_game_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      player_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      timeScanned: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "player_subgame",
    }
  ).associate = (models) => {
    PlayerSubGame.belongsTo(models.Player);
    PlayerSubGame.belongsTo(models.SubGame);
  };
  return PlayerSubGame;
};
