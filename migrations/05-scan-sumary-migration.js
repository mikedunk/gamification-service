"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("scan_summary", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subgame_id: {
        type: Sequelize.BIGINT,
        unique: true,
        allowNull: false,
      },
      number_of_scans: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      timeLastScanned: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("scan_summary");
  },
};
