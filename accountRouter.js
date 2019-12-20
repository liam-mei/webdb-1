const db = require("./data/dbConfig.js");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  db("accounts")
    .select()
    .then(accounts => res.json(accounts))
    .catch(err => res.status(500).json(err));
});



module.exports = router;
