const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: String,
    password: String
  }
);

UserSchema.virtual("id").get(function () {
  return this._id;
});

module.exports = mongoose.model("User", UserSchema);
