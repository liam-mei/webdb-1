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

router.put("/:id", nameExists, async (req, res, next) => {
  const { name, budget } = req.body;
  const { id } = req.params;

  try {
    await db("accounts")
      .where({ id })
      .update({ name, budget });
    res.json(
      await db("accounts")
        .where({ id })
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {});

function nameExists(req, res, next) {
  const { name } = req.body;

  db("accounts")
    .select()
    .where({ name })
    .first()
    .then(account => {
      console.log("account: ", account);
      if (account)
        return res.status(400).json({ error: "name already exists, try a different name" });
      next();
    })
    .catch(err => res.status(500).json(err));
}

module.exports = router;
