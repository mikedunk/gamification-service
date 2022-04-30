"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "player_subgame",
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        sub_game_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          unique: "subgame_player",
          references: {
            model: "sub_game",
            key: "id",
          },
        },
        player_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          unique: "subgame_player",
          references: {
            model: "players",
            key: "id",
          },
        },
        timeScanned: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          subgame_player: {
            fields: ["sub_game_id", "player_id"],
          },
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("player_subgame");
  },
};
