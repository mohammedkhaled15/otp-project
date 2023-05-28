const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    access_token: { type: String },
    telephone: { type: String, required: true },
    code: { type: Number },
    account_status: { type: Number },
    name: { type: String },
    show_stores: { type: Boolean },
    has_paid_order: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
