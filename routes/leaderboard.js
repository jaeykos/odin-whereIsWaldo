const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/score");

router.get("/", async (req, res) => {
  try {
    const easyScores = await Leaderboard.find({ difficulty: "easy" })
      .sort({
        "duration.total_seconds": 1,
      })
      .limit(20)
      .exec();
    const mediumScores = await Leaderboard.find({ difficulty: "medium" })
      .sort({
        "duration.total_seconds": 1,
      })
      .limit(20)
      .exec();
    const hardScores = await Leaderboard.find({ difficulty: "hard" })
      .sort({
        "duration.total_seconds": 1,
      })
      .limit(20)
      .exec();

    const scores = { hardScores, easyScores, mediumScores };

    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", (req, res) => {
  const leaderboard = new Leaderboard({
    name: req.body.name,
    duration: req.body.duration,
    difficulty: req.body.difficulty,
  });
  try {
    const newLeaderboard = leaderboard.save();
    res.status(201).json(newLeaderboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
