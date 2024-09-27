const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 25,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 25,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: function (val) {
        return validator.isEmail(val);
      },
    },
    password: {
      type: String,
      required: true,
      validate: function (val) {
        return validator.isStrongPassword(val);
      },
    },
    age: {
      type: Number,
      required: true,
      trim: true,
      min: 18,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["male", "female", "other"],
    },
    about: {
      type: String,
      default: "Hi, this is about myself",
      trim: true,
    },
    skill: {
      type: [String],
    },
    photoURL: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      validate: function (val) {
        return validator.isURL(val);
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
