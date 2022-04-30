const createError = require("http-errors");
const { redis } = require("../../config/constants");
const { status } = require("../../lib/enums");
const { isInSet, includeInSet } = require("../../lib/redis-utils");
const { getDaysInMillis, addTimeMillis } = require("../../lib/utils");
const { UpdateSubGameSchema } = require("../../lib/validate");
const gameRepository = require("../repositories/game-repository");
const subGameRepository = require("../repositories/subgame-repository");
const playerRepository = require("../repositories/player-repository");
const psgRepository = require("../repositories/player-subgame-repository");

//return a subgame {only an admin can do this}
const getSubGame = async (req, res, next) => {
  try {
    let code = String(req.params.code);
    if (!code) {
      throw createError.BadRequest("invalid code ");
    }
    let subgame = await subGameRepository.findSubGameByCode(code);
    res.send(subgame);
  } catch (error) {
    next(error);
  }
};

const updateSubGameDetails = async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    if (!id || id < 1) {
      throw createError.BadRequest("invalid request parameter");
    }

    let updateRequest = await UpdateSubGameSchema.validateAsync(req.body);
    let parent = await gameRepository.findGameById(updateRequest.game_id);

    if (updateRequest.status) {
      updateRequest.status =
        parent.status === status.INACTIVE
          ? status.INACTIVE
          : updateRequest.status;
    } else {
      updateRequest.status = parent.status;
    }

    if (updateRequest.endDate) {
      let endDate = new Date(Number(updateRequest.endDate));
      console.log(endDate);
      updateRequest.endDate =
        endDate > parent.endDate ? parent.endDate : endDate;
    }
    await subGameRepository.updateSubGame(id, updateRequest);

    let updated = await subGameRepository.findSubGameById(id);
    res.send(updated);
  } catch (error) {
    next(error);
  }
};

const activateSubGame = async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    if (!id || id < 1) {
      throw createError.BadRequest("invalid request parameter");
    }

    let game_id = Number(req.query.game_id);
    if (!game_id || game_id < 1) {
      throw createError.BadRequest("invalid game id");
    }

    let parent = await gameRepository.findGameById(game_id);
    if (parent.status === status.INACTIVE) {
      throw createError.BadRequest(
        "Can't activate subgame if parent game is inactive"
      );
    }
    const activeGSubame = await subGameRepository.activateSubGame(
      req.params.id
    );
    return res.send(activeGSubame);
  } catch (error) {
    next(error);
  }
};

const deactivateSubGame = async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    if (!id || id < 1) {
      throw createError.BadRequest("invalid request parameter");
    }

    const inactiveSubame = await subGameRepository.deactivateSubGame(id);
    return res.send(inactiveSubame);
  } catch (error) {
    next(error);
  }
};

//this is the endpoint the scanner would call
const scanSubGame = async (req, res, next) => {
  try {
    let playerCode = req.player._id;
    let subgameCode = req.params.code;
    let subgame = {};
    let player = {};

    if (!playerCode) {
      throw createError.Forbidden("you can't access this");
    }

    if (!subgameCode) {
      throw createError.BadRequest("invalid code supplied");
    }

    const gameonRedis = await isInSet("game", subgameCode);
    const scanned = await isInSet(subgameCode, playerCode);

    if (scanned) {
      throw createError.Forbidden("you have already scanned this code");
    }

    if (!gameonRedis) {
      subgame = await subGameRepository.findSubGameByCode(subgameCode);
      includeInSet("game", subgame.code);
    }
    subgame = await subGameRepository.findSubGameByCode(subgameCode);
    player = await playerRepository.findPlayerByCode(playerCode);

    let body = { player_id: player.id, sub_game_id: subgame.id };
    let rec = await psgRepository.create(body);
    includeInSet(subgame.code, player.code);

    res.send(true);
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      error.status = 403;
      error.message = "you have already scanned this code";
    }
    next(error);
  }

  /** What happens during a scan
   *  A get request with the user's details. if there is no auth header, maybe redirict to download
   * i.e put a redirect link in env file so it can be configurable.
   *
   * A successful request
   * - stamps a record on the player_subgame table
   * - returns link to a resource or true
   *
   * To hasten checks a 'set' entry on redis with @key subgameCode, @value [playercode],
   * - this check would be the first thing after we have verified user
   * - this is to prevent multiple scans from the same user
   *
   */
};

module.exports = {
  getSubGame,
  scanSubGame,
  updateSubGameDetails,
  activateSubGame,
  deactivateSubGame,
  scanSubGame,
};
