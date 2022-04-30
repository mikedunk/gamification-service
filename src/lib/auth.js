/**
 * this file handles all methods required for authorization and authentication
 */
const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  const decoded_token = jwt.decode(token);
  console.log("decoded jwt token ");
  console.log(decoded_token);
  return decoded_token;
};

module.exports = decodeToken;
