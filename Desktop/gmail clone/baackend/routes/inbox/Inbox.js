const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  }
);

module.exports = mongoose.model("inbox", inboxSchema);
