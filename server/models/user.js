const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    access_token: { type: String },
    telephone: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
