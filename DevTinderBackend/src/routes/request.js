const express = require("express");
const { userAuth } = require("../MiddleWares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
      const status = req.params.status;
      const allowedStatus = ["interested", "ignored"];
      const toUserExists = await User.findById(toUserId);
      if (!toUserExists) {
        return res.status(400).json({ message: "Invalid connection request" });
      }
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type: " + status });
      }
      const connectionExists = await ConnectionRequestModel.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (connectionExists) {
        return res.status(400).json({ message: "Connection already exists" });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({ message: "Connection send successfully", data });
    } catch (err) {
      res.send(err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const requestId = req.params.requestId;
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status: " + status });
      }
      const connectionAvailable = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionAvailable) {
        return res
          .status(404)
          .json({ message: "Connection Request is not found" });
      }
      connectionAvailable.status = status;
      const data = await connectionAvailable.save();
      res.json({ message: "Coonection Request " + status, data });
    } catch (err) {
      res.send(err.message);
    }
  },
);
module.exports = requestRouter;
