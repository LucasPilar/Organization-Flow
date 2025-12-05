const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  text: { type: String, required: true },
  isChecked: { type: Boolean, default: false },
});

const CardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  taska: [TaskSchema],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", CardSchema);
