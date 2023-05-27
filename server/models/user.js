const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    telephone: { type: String, required: true },
    topScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
