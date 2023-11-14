const express = require("express");
const router = express.Router();
const character_coordinate = require("../models/character_coordinate");

router.post("/:difficulty/:characterName", (req, res) => {
  try {
    const clicked_x = req.body.x;
    const clicked_y = req.body.y;

    const actual_x =
      character_coordinate[req.params.difficulty][req.params.characterName].x;
    const actual_y =
      character_coordinate[req.params.difficulty][req.params.characterName].y;

    const radius = 30;

    const isClickedWithinRadius =
      Math.sqrt(
        (clicked_x - actual_x) * (clicked_x - actual_x) +
          (clicked_y - actual_y) * (clicked_y - actual_y)
      ) < radius;

    if (isClickedWithinRadius) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:difficulty/hint", (req, res) => {
  try {
    res.json(character_coordinate[req.params.difficulty]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
