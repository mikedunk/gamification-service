/**
 * this file houses all external api calls made
 */

const Axios = require("axios");

const { ext, auth } = require("./../../config/constants");
const baseUrl = "/api/v1/clients";
const regUrl = "/register";
const tokenUrl = "/oauth/token";

module.exports = {
  getClientToken() {
    let param = auth.client_id + ":" + auth.client_secret;
    let base64ed = Buffer.from(param).toString("base64");
    const auth_head = { Authorization: "Basic " + base64ed };
    return auth_head;
  },

  async getAccessToken() {
    const auth_head = getClientToken();
    const url = ext.auth_service_host + baseUrl + tokenUrl;
    return Axios.get(url, { headers: auth_head });
  },

  async getPlayerAccessToken(loginRequest) {
    const auth_head = this.getClientToken;
    const url = ext.auth_service_host + "/api/v1/user/login";
    return Axios.post(url, loginRequest, { headers: auth_head });
  },

  async registerService() {
    const requestBody = {
      client_id: auth.client_id,
      client_secret: auth.client_secret,
      resource_ids: auth.resource_ids,
    };
    const url = ext.auth_service_host + baseUrl + regUrl;
    return Axios.post(url, requestBody);
  },

  async registerNewUser(body) {
    const auth_head = this.getClientToken;
    const url = ext.auth_service_host + "/api/v1/user/register";
    return Axios.post(url, body, auth_head, { headers: this.getClientToken });
  },

  getQr() {},
};
