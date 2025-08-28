const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Rank.Name
  name: String,
  rank: String,
  belt: String,
  mobile: { type: String, unique: true },
  email: { type: String, unique: true },
  district: String,
  policeStation: String,
  password: String // hashed
});

module.exports = mongoose.model("User", userSchema);
