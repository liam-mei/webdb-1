require("dotenv").config();
const express = require("express");
const accountRouter = require("./accountRouter");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountRouter);

server.use((err, req, res, next) => {
  res.status(500).json({err})
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
