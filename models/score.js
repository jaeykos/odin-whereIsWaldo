const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },

  time: {
    type: Number,
    required: true,
    minLength: 1,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Score", postSchema);
