"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reward", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      games_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "games",
          key: "id",
        },
      },
      sub_game_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "sub_game",
          key: "id",
        },
      },
      winner_id: {
        type: Sequelize.BIGINT,
        allowNull: true, //this is a player_id it would be joined as winner
      },
      winning_attribute: {
        type: Sequelize.TEXT, //this tells us selection criteria
        allowNull: true,
      },
      reward_description: {
        type: Sequelize.STRING, //this tells us the reward to be won
        allowNull: true,
      },
      reward_link: {
        type: Sequelize.STRING, // a link to the reward
        allowNull: true,
      },
      won: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      time_won: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("reward");
  },
};
