const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("User is not LoggedIn");
    }
    const decodeobj = await jwt.verify(token, "Niketa@#123");
    const { _id } = decodeobj;
    const user = await User.findById({ _id: _id });
    if (!user) {
      throw new Error("Not valid User");
    }
    req.user = user;
    next();
  } catch (err) {
    res.send(err.message);
  }
};
module.exports = {
  userAuth,
};
