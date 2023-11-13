const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },

  duration: {
    seconds: { type: Number },
    minutes: { type: Number },
    total_seconds: { type: Number },
  },

  difficulty: {
    type: String,
  },
});

module.exports = mongoose.model("Score", scoreSchema);
