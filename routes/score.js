const express = require("express");
const router = express.Router();
const Score = require("../models/score");

router.get("/", async (req, res) => {
  try {
    const posts = await Score.find().sort({ total_Seconds: "descending" });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const score = new Score({
    name: req.body.name,
    duration: req.body.duration,
  });
  try {
    const newPost = await score.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
