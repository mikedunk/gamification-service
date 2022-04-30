const { SubGame, Game, ScanSummary } = require("../../../models");

const { Sequelize, Op } = require("sequelize");
const { dbo } = require("../../config/constants");
const { includeInSet } = require("../../lib/redis-utils");
const { status } = require("../../lib/enums");
const createError = require("http-errors");

const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

async function findSubGameById(id) {
  let subgame = await SubGame.findByPk(id, {
    attributes: [
      "id",
      "game_id",
      "code",
      "description",
      "status",
      "additional_info",
      "resource_link",
      "createdAt",
    ],
  });
  if (!(subgame instanceof SubGame)) {
    console.log("error subgame : " + subgame);
    throw createError.UnprocessableEntity(
      `There is no subgame with id : ${id}`
    );
  }
  return subgame;
}

async function findSubGameByCode(code) {
  const subgame = await SubGame.findOne({
    attributes: [
      "id",
      "game_id",
      "code",
      "description",
      "status",
      "additional_info",
      "resource_link",
      "createdAt",
    ],
    where: {
      code: code,
    },
  });

  if (!(subgame instanceof SubGame)) {
    throw createError.UnprocessableEntity(
      `There is no subgame with code: ${code}`
    );
  }
  return subgame;
}
async function activateSubGame(id) {
  let obj = await SubGame.findByPk(id);
  obj.status = status.ACTIVE;
  return await obj.save();
}

async function deactivateSubGame(id) {
  let obj = await SubGame.findByPk(id);
  obj.status = status.INACTIVE;
  return await obj.save();
}

async function findAllSubGamesByStatus(status, gameId) {
  //find all active subgames belonging to a particular game
  const object = await SubGame.findAll({
    where: {
      game_id: gameId,
      status: status,
    },
  });
}

/**
 *
 * @ C R U D
 */

async function create(body) {
  const trx = await sequelize.transaction(async (t) => {
    const subgame = await SubGame.create(body, { transaction: t });
    await ScanSummary.create(
      { subgame_id: subgame.id, timeLastScanned: new Date(0) },
      { transaction: t }
    );
    return subgame;
  });
  includeInSet("game", trx.code);
  return trx;
}

async function updateSubGame(id, body) {
  return await Game.update(body, {
    where: {
      id: id,
    },
  });
}

module.exports = {
  findSubGameById,
  findSubGameByCode,
  findAllSubGamesByStatus,
  create,
  updateSubGame,
  activateSubGame,
  deactivateSubGame,
};
