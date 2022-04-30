/**
 * Get token from parent
 */
const apiService = require("./../lib/outward/axios");

async function registerService() {
  console.log("service registration in progress...");
  try {
    const result = await apiService.registerService();
    console.log(result.data.message);
    console.log("registration complete  complete...");
    //check for dofferent errors
  } catch (error) {
    handleError(error);
  }
}

async function getAccessToken() {
  try {
    const response = await apiService.getAccessToken();
    global.serviceAccessToken = response.data.access_token;
  } catch (error) {
    handleError(error);
  }
}

const handleError = (error) => {
  if (error.response) {
    console.log(error.response.data.error);
  } else if (error.request) {
    console.log("Please check if destination service is running");
    //console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
};

module.exports = {
  registerService,
  getAccessToken,
};
