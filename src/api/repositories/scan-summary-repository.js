const { ScanSummary } = require("../../../models");

const { Sequelize, Op } = require("sequelize");
const { dbo } = require("../../config/constants");

const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

async function createEntry(game_code) {
  return await ScanSummary.create(game_code);
}
