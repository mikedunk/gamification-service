const { PlayerSubGame } = require("../../../models");

const { Sequelize, Op } = require("sequelize");
const { dbo } = require("../../config/constants");

const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

async function findPlayerSubgameById(id) {
  const object = await PlayerSubGame.findByPk(id);
  if (!(object instanceof PlayerSubGame)) {
    throw createError.UnprocessableEntity("There is no such player");
  }
  return object;
}

/**
 *
 * @CRUD
 */

async function create(body) {
  return await PlayerSubGame.create(body);
}

module.exports = { findPlayerSubgameById, create };
