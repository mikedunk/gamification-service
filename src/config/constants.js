require("dotenv").config();

module.exports = {
  app: {
    name: process.env.APP_NAME,
    port: process.env.PORT || 5033,
    environment: process.env.NODE_ENV,
    logpath: process.env.LOG_PATH,
  },

  dbo: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
  },
  application_logging: {
    file: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL || "info",
    console: process.env.LOG_ENABLE_CONSOLE || true,
  },
  auth: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    resource_ids: process.env.RESOURCE_IDS,
    token_retry_limit: process.env.TOKEN_RETRY_LIMIT,
    token_secret: process.env.TOKEN_SECRET,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  ext: {
    auth_service_host: process.env.AUTH_SERVICE_HOST,
    qr_host: process.env.QR_HOST,
  },
  sub_game_code_length: process.env.SUB_GAME_CODE_LENGTH,
};
