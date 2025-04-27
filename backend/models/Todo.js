const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["Incomplete", "Complete"],
    default: "Incomplete",
  },
  deadline: { type: String },
});

module.exports = mongoose.model("Todo", TodoSchema);
