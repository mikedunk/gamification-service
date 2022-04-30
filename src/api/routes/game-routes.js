const express = require("express");
const {
  createGame,
  updateGameDetails,
  createSubGame,
  activateGame,
  deactivateGame,
  getAllActiveGames,
  getAllGamesSubgames,
  getGamesSubgames,
  getAllGames,
} = require("../controllers/game-controller");

gameRouter = express.Router();

gameRouter.post("/create", createGame);

gameRouter.post("/update", updateGameDetails);

gameRouter.get("/activate/:gameId", activateGame);

gameRouter.get("/deactivate/:gameId", deactivateGame);

gameRouter.post("/sub/create/:gameId", createSubGame);

gameRouter.get("/active/all", getAllActiveGames);

gameRouter.get("/all", getAllGames);

gameRouter.get("/all/all", getAllGamesSubgames);

gameRouter.get("/:id", getGamesSubgames);

//gameRouter.get("/:gameId", getGame);

//gameRouter.get("/sub/:subGameId", getSubGame);

module.exports = gameRouter;
