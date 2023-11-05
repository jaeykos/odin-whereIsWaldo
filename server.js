require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(process.env.DATABASE_URL, { dbName: "whereIswaldo" });
const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});

db.on("open", () => {
  console.log("Connected to database");
});

app.use(express.json());

const gameRouter = require("./routes/game");
app.use("/game", gameRouter);

const scoreRouter = require("./routes/score");
app.use("/score", scoreRouter);

app.listen(3000, () => {
  console.log("Sever Started");
});
