const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "deleted"], 
    Default: "active",
  },
});

userSchema.set("timestamps", true);
module.exports = mongoose.model("user", userSchema);
