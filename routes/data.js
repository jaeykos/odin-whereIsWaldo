const express = require("express");
const router = express.Router();
const Score = require("../models/score");

//Get all scores
router.get("/scores", async (req, res) => {
  try {
    const scores = await Post.find().sort({ time: "descending" });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create one score
router.post("/scores/new", async (req, res) => {
  const score = new Score({
    name: req.body.name,
    time: req.body.time,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
