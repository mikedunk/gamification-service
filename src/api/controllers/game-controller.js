/**
 *
 * @author Michael Ayeyemi
 * @Date 31st July 2021
 *
 */

const createError = require("http-errors");
const { redis } = require("../../config/constants");
const { status } = require("../../lib/enums");
const { getDaysInMillis, addTimeMillis } = require("../../lib/utils");
const {
  NewGameSchema,
  UpdateGameSchema,
  NewSubGameSchema,
} = require("../../lib/validate");
const gameRepository = require("../repositories/game-repository");
const subGameRepository = require("../repositories/subgame-repository");

const createGame = async (req, res, next) => {
  try {
    let body = await NewGameSchema.validateAsync(req.body);

    let temp = addTimeMillis(
      body.startDate,
      getDaysInMillis(body.durationInDays)
    );
    body.startDate = new Date(body.startDate);
    body.endDate = new Date(temp);
    body.status = status.INACTIVE;

    const newGame = await gameRepository.create(body);
    return res.json({ success: true, result: newGame });
  } catch (error) {
    next(error);
  }
};

const updateGameDetails = async (req, res, next) => {
  try {
    let body = await UpdateGameSchema.validateAsync(req.body);
    // schema validation will ensure duration is provided if startTime is provided
    if (body.startDate) {
      let temp = addTimeMillis(
        body.startDate,
        getDaysInMillis(body.durationInDays)
      );
      body.startDate = new Date(body.startDate);
      body.endDate = new Date(temp);
    }
    await gameRepository.updateGame(body.id, body);
    const updatedGame = await gameRepository.findGameById(body.id);
    return res.json({ success: true, result: updatedGame });
  } catch (error) {
    next(error);
  }
};

const activateGame = async (req, res, next) => {
  try {
    if (!Number(req.params.gameId)) {
      throw createError.BadRequest("invalid request parameter");
    }
    const activeGame = await gameRepository.activateGame(req.params.gameId);
    return res.json({ success: true, result: activeGame });
  } catch (error) {
    next(error);
  }
};

const deactivateGame = async (req, res, next) => {
  try {
    if (!Number(req.params.gameId)) {
      throw createError.BadRequest("invalid request parameter");
    }
    const inactiveGame = await gameRepository.deactivateGame(req.params.gameId);
    return res.json({ success: true, result: inactiveGame });
  } catch (error) {
    next(error);
  }
};

const createSubGame = async (req, res, next) => {
  try {
    let temp = Number(req.params.gameId);
    if (!temp || temp < 0) {
      throw createError.BadRequest("invalid game parent id");
    }

    const subGameRequest = await NewSubGameSchema.validateAsync(req.body);
    const parent = await gameRepository.findGameById(temp);

    if (!subGameRequest.status) {
      subGameRequest.status = parent.status;
    } else {
      //subgame has status
      subGameRequest.status =
        parent.status === status.INACTIVE
          ? status.INACTIVE
          : subGameRequest.status;
    }
    subGameRequest.game_id = temp;

    if (subGameRequest.endDate) {
      subGameRequest.endDate = new Date(subGameRequest.endDate);

      if (subGameRequest.endDate > parent.endDate) {
        throw createError.UnprocessableEntity(
          "end date can't be later than parent's end date"
        );
      }
    } else {
      subGameRequest.endDate = parent.endDate;
    }

    const newSubGame = await subGameRepository.create(subGameRequest);
    return res.json({ success: true, result: newSubGame });
  } catch (error) {
    next(error);
  }
};

const getAllGames = async (req, res, next) => {
  try {
    const all = await gameRepository.findAllGames();
    return res.json({ success: true, result: all });
  } catch (error) {
    next(error);
  }
};

//needs pagination
const getAllActiveGames = async (req, res, next) => {
  try {
    let games = await gameRepository.findGamesByStatus(status.ACTIVE);
    return res.json({ success: true, result: games });
  } catch (error) {
    next(error);
  }
};

//todo: needs pagaination
const getAllGamesSubgames = async (req, res, next) => {
  try {
    let games = await gameRepository.findAllGamesAndSubgames(status.ACTIVE);
    return res.json({ success: true, result: games });
  } catch (error) {
    next(error);
  }
};

const getGamesSubgames = async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    if (!id || id <= 0) {
      throw createError("Invalid game id");
    }
    let game = await gameRepository.findGamesAndSubgames(id);
    return res.json({ success: true, result: game });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGame,
  updateGameDetails,
  createSubGame,
  activateGame,
  deactivateGame,
  getAllActiveGames,
  getAllGamesSubgames,
  getAllGames,
  getGamesSubgames,
};

//things to try out
// i want to use instanceof to ensure there the model instead of !model
//inorder:
//try finding and throwing if it doesnt exist i want to avoid
