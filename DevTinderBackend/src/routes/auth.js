const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const validator = require("validator");
const { signupValidation } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {
    signupValidation(req);
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const userData = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });
    await userData.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Bad Request: " + err.message);
  }
});
authRouter.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId) || emailId === "") {
      throw new Error("Invalid EmailId");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User is not valid");
    } else {
      const passwordMatch = await user.validatePassword(password);

      if (passwordMatch) {
        const token = await user.getJWT();

        res.cookie("token", token, { expires: new Date(Date.now() + 360000) });
        res.send("Login successfull " + user.firstName);
      } else {
        throw new Error("Invalid credential");
      }
    }
  } catch (err) {
    res.status(400).send("Login Error: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successfully");
});

module.exports = authRouter;
