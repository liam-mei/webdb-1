const db = require("./data/dbConfig.js");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  db("accounts")
    .select()
    .then(accounts => res.json(accounts))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json(
      await db
        .select("*")
        .from("accounts")
        .where({ id: req.params.id })
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.post("/", nameExists, async (req, res, next) => {
  const { name, budget } = req.body;

  // try {
  //   const [id] = await db("accounts").insert({ name, budget });
  //   res.json(
  //     await db("accounts")
  //       .where("id", id)
  //       .first()
  //   );
  // } catch (err) {
  //   res.status(500).json(err);
  // }

  db("accounts")
    .insert({ name, budget })
    .then(array => {
      const [id] = array;
      db("accounts")
        .where({ id })
        .first()
        .then(account => res.json(account))
        .catch(err => next({ ...err, message: "error retrieving account after insert" }));
    })
    .catch(err => next({ ...err, message: "error inserting" }));
});



module.exports = router;
