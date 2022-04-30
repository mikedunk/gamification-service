const express = require("express");
const { verify } = require("../../lib/middleware");

const { scanSubGame } = require("../controllers/subgame-controller");

scanRouter = express.Router();

scanRouter.get("/:code", verify, scanSubGame);

module.exports = scanRouter;
