/**
 * Contains all the db calls required to service the named model
 */

const { SubGame, Game } = require("../../../models");

const { Sequelize, Op } = require("sequelize");
const { dbo } = require("../../config/constants");
const { status } = require("../../lib/enums");
const createError = require("http-errors");

const sequelize = new Sequelize(dbo.name, dbo.username, dbo.password, {
  host: dbo.host,
  dialect: dbo.dialect,
});

async function findGameById(id) {
  const game = await Game.findByPk(id, {
    attributes: [
      "id",
      "description",
      "status",
      "additional_info",
      "resource_link",
      "createdAt",
      "endDate",
      "startDate",
      "durationInDays",
    ],
  });
  if (!(game instanceof Game)) {
    throw createError.UnprocessableEntity("There is no such game");
  }
  return game;
}

async function findGamesByStatus(status) {
  return await Game.findAll({
    where: {
      status: status,
    },
  });
}

async function findAllGames() {
  return await Game.findAll();
}

//find a game's subgames

async function findGamesAndSubgames(id) {
  let game = await Game.findByPk(id, { include: [SubGame] });
  if (!(game instanceof Game)) {
    throw createError.UnprocessableEntity("There is no such game");
  }
  return game;
}

async function findAllGamesAndSubgames() {
  return await Game.findAll({ include: [SubGame] });
}

/**
 * @CRUD
 */

async function create(body) {
  return await Game.create(body);
}

async function updateGame(id, body) {
  return await Game.update(body, {
    where: {
      id: id,
    },
  });
}

async function activateGame(id) {
  let obj = await Game.findByPk(id);
  obj.status = status.ACTIVE;
  return await obj.save();
}

//todo: also deactivate all subgames
async function deactivateGame(id) {
  let obj = await Game.findByPk(id);
  obj.status = status.INACTIVE;
  return await obj.save();
}

async function completeGame(id) {
  return await Game.update(
    { status: status.COMPLETED },
    {
      where: {
        id: id,
      },
    }
  );
}

async function cancelGame(id) {
  return await Game.update(
    { status: status.CANCELLED },
    {
      where: {
        id: id,
      },
    }
  );
}

// side note: when a game is deactivated, all subagames must be deactivated, when it is completed or cancelled : same,
//so wrap in a transaction and update its kids

module.exports = {
  findAllGames,
  findGameById,
  findGamesByStatus,
  findGamesAndSubgames,
  findAllGamesAndSubgames,
  create,
  updateGame,
  activateGame,
  deactivateGame,
  completeGame,
  cancelGame,
};
