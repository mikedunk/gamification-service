"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sub_game", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      game_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "games",
          key: "id",
        },
      },
      code: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING(16),
        allowNull: false,
      },
      additional_info: {
        type: Sequelize.TEXT,
      },
      resource_link: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sub_game");
  },
};
