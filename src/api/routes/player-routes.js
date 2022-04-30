const express = require("express");
const {
  registerPlayer,
  loginPlayer,
} = require("../controllers/player-controller");

playerRouter = express.Router();

playerRouter.post("/register", registerPlayer);

playerRouter.post("/login", loginPlayer);

module.exports = playerRouter;
