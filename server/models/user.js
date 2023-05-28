const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    telephone: { type: String, required: true },
    code: { type: Number },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
