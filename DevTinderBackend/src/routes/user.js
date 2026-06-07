const express = require("express");
const { userAuth } = require("../MiddleWares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");

    if (!connectionRequests) {
      return res.status(404).json({
        message: "No connection Found",
      });
    }

    res.json({
      message: "Data fetched succesfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = userRouter;
