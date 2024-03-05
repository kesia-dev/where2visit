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
      required: true, // leaving this for now, issues with duplicate keys if turned off? unclear.
      unique: false
    },
    resetLink: {
      type: String,
      required: false,
      unique: false
    },
    resetLinkExpiration: {
      type: Date,
      required: false
    }
  });
  module.exports=mongoose.model('User', userSchema);
