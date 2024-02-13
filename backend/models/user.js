const { mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      required: true
    },
    emailVerificationLink: {
      type: String,
      required: false,
      unique: true,
    }
  });
  module.exports=mongoose.model('User', userSchema);
