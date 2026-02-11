const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
name:String,
 email: { type: String, unique: true },
password: String,
});

module.exports = mongoose.model("user",SignupSchema,"user");