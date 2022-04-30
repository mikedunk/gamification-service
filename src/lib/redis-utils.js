const asyncRedisClient = require("../config/redisconfig");

async function deleteRedisKey(key) {
  try {
    const val = await asyncRedisClient.DEL(key);
    console.log("inside delete redis " + val);
    return val;
  } catch (error) {
    console.log(err);
    throw createError.InternalServerError(err.message);
  }
}

async function setOnRedisWithExpiry(key, value, expiry) {
  try {
    const val = await asyncRedisClient.SET(key, value, "EX", expiry);
    return val;
  } catch (error) {
    console.log(err);
    throw createError.InternalServerError(err.message);
  }
}

async function setOnRedis(key, value) {
  try {
    const val = await asyncRedisClient.SET(key, value);
    return val;
  } catch (error) {
    console.log(error);
    throw createError.InternalServerError(error.message);
  }
}

async function includeInSet(key, element) {
  try {
    await asyncRedisClient.SADD(key, element);
    console.log(`${element} added to redis set ${key}`);
  } catch (error) {
    console.log(error);
    throw createError.InternalServerError(error.message);
  }
}

async function isInSet(key, element) {
  const res = await asyncRedisClient.SISMEMBER(key, element);
  if (res === 1) {
    return true;
  } else return false;
}

async function getOnRedis(key) {
  return await asyncRedisClient.GET(key);
}

module.exports = {
  setOnRedisWithExpiry,
  setOnRedis,
  getOnRedis,
  deleteRedisKey,
  includeInSet,
  isInSet,
};
