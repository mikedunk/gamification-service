//mostly redis calls to hasten shit

const express = require("express");
const { app } = require("./src/config/constants");
const err = require("./src/error/errors");
require("./src/config/redisconfig");
const dbCon = require("./src/config/dbconfig");
const cors = require("cors");
const playerRouter = require("./src/api/routes/player-routes");
const gameRouter = require("./src/api/routes/game-routes");
const subgameRouter = require("./src/api/routes/subgame-routes");
const scanRouter = require("./src/api/routes/scan-routes");
const {
  registerService,
  getAccessToken,
} = require("./src/config/game-auth-service");
const { verify } = require("./src/lib/middleware");

const exp = express();
exp.use(express.json());
exp.use("/api/v1/player", playerRouter);
exp.use("/api/v1/game", gameRouter);
exp.use("/api/v1/subgame", subgameRouter);
exp.use("/api/v1/scan", verify, scanRouter);
exp.use(err.notfound);
exp.use(err.defaultHandler);

exp.listen(app.port, async () => {
  console.log(`Server is running on port ${app.port}.`);
  try {
    await dbCon.authenticate();
    console.log("db conncted");
    console.log(app.environment);
    await registerService();
    // await getAccessToken();
  } catch (error) {
    // console.log(error);
  }
});
