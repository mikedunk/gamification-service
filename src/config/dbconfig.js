const Sequelize = require("sequelize");
const mysql = require("mysql2");
const { dbo } = require("./constants.js");

//const path = 'mysql://user12:12user@localhost:3306/mydb';

const dbCon = new Sequelize(dbo.name, dbo.username, dbo.password, {
  dialect: dbo.dialect,
  host: dbo.host,
  port: dbo.port,
  logging: false,
});

module.exports = dbCon;
