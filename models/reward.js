"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { dbo } = require("../src/config/constants");

const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

class Reward extends Model {}

module.exports = (sequelize, DataTypes) => {
  Reward.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      game_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      sub_game_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      winner_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //this is a player_id it would be joined as winner
      },
      winning_attribute: {
        type: DataTypes.TEXT, //this tells us selection criteria
        allowNull: true,
      },
      reward_description: {
        type: DataTypes.STRING, //this tells us the reward to be won
        allowNull: true,
      },
      reward_link: {
        type: DataTypes.STRING, // a link to the reward
        allowNull: true,
      },
      won: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      time_won: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "reward",
      timestamps: false,
    }
  );
  return Reward;
};
