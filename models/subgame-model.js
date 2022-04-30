"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { dbo } = require("../src/config/constants");
const { getSubGameCode } = require("../src/lib/utils");
const status = require("../src/lib/enums");
const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

class SubGame extends Model {}

module.exports = (sequelize, DataTypes) => {
  SubGame.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      game_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      code: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => {
          return getSubGameCode();
        },
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: status.INACTIVE,
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
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: "sub_game",
      paranoid: true,
    }
  ).associate = (models) => {
    SubGame.belongsTo(models.Game, { foreignKey: "game_id" });
    SubGame.belongsToMany(models.Player, {
      through: "PlayerSubGame",
      as: "played",
    });
  };
  return SubGame;
};
