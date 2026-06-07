const { userAuth } = require("../MiddleWares/auth");
const express = require("express");
const { isValidEditableField } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!isValidEditableField(req)) {
      throw new Error("Invalid Edit Request");
    }
    let loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({ message: "User updated Successfully", data: loggedInUser });
  } catch (err) {
    res.send(err.message);
  }
});
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    let loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({ message: "User updated Successfully", data: loggedInUser });
  } catch (err) {
    res.send(err.message);
  }
});
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { user } = req;

    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = profileRouter;
