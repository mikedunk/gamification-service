"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { dbo } = require("../src/config/constants");

const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

class Player extends Model {}

module.exports = (sequelize, DataTypes) => {
  Player.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      domain: {
        type: DataTypes.STRING,
        defaultValue: "PAZA",
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: "players",
      paranoid: true,
    }
  ).associate = (models) => {
    Player.belongsToMany(models.SubGame, {
      through: "PlayerSubGame",
      as: "scanned",
    });
  };
  return Player;
};
