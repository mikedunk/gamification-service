/**
 * Contains all middlwares service would need
 */
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { auth } = require("../config/constants");

const verifyUser = (req, res, next) => {
  if (req.user.role == undefined || req.user.role.name != userType.ADMIN) {
    res.status(403).json({ success: false, message: "Access Denied" });
  } else next();
};

const verify = async (req, res, next) => {
  try {
    let bearerToken = req.header("Authorization");
    if (!bearerToken) {
      throw new createError.Unauthorized("invalid credentials");
    }

    bearerToken = bearerToken.split(" ");
    const token = bearerToken[1];

    if (!token) {
      throw new createError.Unauthorized("invalid credentials");
    }
    const verified = jwt.decode(token, auth.token_secret, {
      algorithms: ["HS256"],
    });

    if (!verified || verified instanceof Error) {
      throw new createError.Unauthorized("token dectypt failed");
    }

    const resources = verified.aud;

    if (!resources.includes("awari_games")) {
      throw new createError.Unauthorized("we dont know who you are");
    }

    req.player = verified;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  verify,
};
