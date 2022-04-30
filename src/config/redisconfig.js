const redis = require("redis");
const asyncRedis = require("async-redis");

const conf = require("./constants.js");

const client = redis.createClient({
  port: conf.redis.port,
  host: conf.redis.host,
});

const asyncRedisClient = asyncRedis.decorate(client);

asyncRedisClient.on("connect", () => {
  console.log(`Client connected to redis on port ${conf.redis.port}`);
});

asyncRedisClient.on("ready", () => {
  console.log("Client connected to redis and ready to use...");
});

asyncRedisClient.on("error", (err) => {
  console.log(err.message);
});

asyncRedisClient.on("end", () => {
  console.log("Shutting down redis gracefully...");
});

process.on("SIGTERM", () => {
  redisClient.quit();
});

module.exports = asyncRedisClient;
