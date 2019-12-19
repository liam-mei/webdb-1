require("dotenv").config();
const express = require("express");
const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
