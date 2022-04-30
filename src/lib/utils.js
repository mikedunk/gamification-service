/**
 *
 *This houses the methods used regularly in the application
 * continue from here : decode request
 *
 * implement a middlware that would check aud claims and bounce those without games
 *
 */

const { customAlphabet } = require("nanoid");
const { sub_game_code_length } = require("../config/constants");
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";

const nanoid = customAlphabet(alphabet, Number(sub_game_code_length));

const getSubGameCode = () => {
  const code = nanoid();
  console.log(code);
  return code;
};

function sanitizeInput(input) {
  const stringWithNoSpaces = stripSpaces(input);
  return lowerCase(stringWithNoSpaces);
}

//removes spaces from strings
function stripSpaces(stringWithSpaces) {
  return stringWithSpaces.replace(/\s+/g, "");
}

function lowerCase(somestring) {
  return somestring.toLowerCase();
}

function getDaysInMillis(days) {
  return Number(days * 86400000);
}
function addTimeMillis(time1, time2) {
  return Number(time1 + time2);
}
module.exports = {
  getSubGameCode,
  sanitizeInput,
  stripSpaces,
  lowerCase,
  getDaysInMillis,
  addTimeMillis,
};
