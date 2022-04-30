/**
 *
 * @author Michael Ayeyemi
 * @Date 30th July 2021
 * @
 */

const {
  RegistrationSchema,
  LoginSchema,
  UpdateGameSchema,
} = require("./../../lib/validate");
const playerRepository = require("../repositories/player-repository");
const createError = require("http-errors");
const { lowerCase, sanitizeInput, stripSpaces } = require("../../lib/utils");
const {
  registerNewUser,
  getPlayerAccessToken,
} = require("../../lib/outward/axios");

const registerPlayer = async (req, res, next) => {
  try {
    const startTIme = Date.now();
    let newPlayerRequest = await RegistrationSchema.validateAsync(req.body);
    const scemavalidationTime = Date.now();
    let lowerEmail = stripSpaces(newPlayerRequest.email);
    let lowerUsername = stripSpaces(newPlayerRequest.username);
    let phone = stripSpaces(newPlayerRequest.phone_number);
    const inputProcessing = Date.now();
    let playerWithDeet = await playerRepository.playerWithAnyUniqueDetailExists(
      lowerEmail,
      phone,
      lowerUsername
    );
    const checkDbForUser = Date.now();

    if (playerWithDeet.matched === true) {
      throw createError.Conflict(
        `a user with this ${playerWithDeet.matchedParam} exists`
      );
    }
    if (playerWithDeet instanceof Error) {
      console.log(playerWithDeet);
      throw createError.InternalServerError(
        "There was a problem validating your credentials"
      );
    }
    //create user on paza auth then come and create user on awari so that :code

    const response = await registerNewUser(newPlayerRequest);
    let pazaUser = response.data;

    const freshPlayer = await playerRepository.createPlayer(pazaUser);
    console.log(freshPlayer);
    return res.status(201).json({
      success: true,
      message: "user created successfully please login to continue",
    });
  } catch (error) {
    if (error.isAxiosError) {
      console.log(error.response.data.error);
      error.message = "there was a problem processsing your request";
    } else {
      console.log(error);
    }

    next(error);
  }
};

const loginPlayer = async (req, res, next) => {
  try {
    let loginReq = await LoginSchema.validateAsync(req.body);

    const loginResponse = await getPlayerAccessToken(loginReq);

    return res.send(loginResponse.data);
  } catch (error) {
    if (error.isAxiosError) {
      console.log(error.response.data.error);
      error.message = error.response.data.error;
      error.status = error.response.status;
    } else {
      console.log(error);
    }
    next(error);
  }
};

module.exports = { registerPlayer, loginPlayer };

/**
 * things to consider
 *
 * email validation without the "." during validation to prevent people from registering multiple times w
 * phone number validation maybe count from the back and make sure its 10 characters after were removed spaces
 * saving the number +234(0)803 123 4567 8031234567
 */
