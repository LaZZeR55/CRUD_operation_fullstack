const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  //password: "merc1234",
  database: process.env.DB_BASE,
});

module.exports = db;
