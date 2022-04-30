const express = require("express");
const {
  getSubGame,
  updateSubGameDetails,
  activateSubGame,
  deactivateSubGame,
} = require("../controllers/subgame-controller");

subgameRouter = express.Router();

subgameRouter.get("/:code", getSubGame);

subgameRouter.post("/update/:id", updateSubGameDetails);

subgameRouter.get("/activate/:id", activateSubGame);

subgameRouter.get("/deactivate/:id", deactivateSubGame);

// gameRouter.post("/sub/create/:gameId", createSubGame);

// gameRouter.post("/sub/update/:gameId", updateSubGameDetails);

//gameRouter.get("/:gameId", getGame);

//gameRouter.get("/sub/:subGameId", getSubGame);

module.exports = subgameRouter;
