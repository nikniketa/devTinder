const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const validator = require("validator");

app.use(express.json());
app.post("/signup", async (req, res) => {
  const data = req.body;
  const userData = new User(data);
  try {
    if (data?.skill.length > 10) {
      throw new Error("UpdateOnly 10 skills allowed");
    }
    await userData.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Bad Request: " + err.message);
  }
});
app.get("/user", async (req, res) => {
  const data = req.body.emailId;
  try {
    const user = await User.find({ emailId: data });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("no User found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.userId);
    res.send("User Deleted");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  try {
    const forUpdate = [
      "firstName",
      "lastName",
      "password",
      "about",
      "skill",
      "photoURL",
    ];
    const isFieldUpdatable = Object.keys(data).every((x) =>
      forUpdate.includes(x)
    );
    if (data?.skill.length > 10) {
      throw new Error("UpdateOnly 10 skills allowed");
    }
    if (isFieldUpdatable) {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        data,
        {
          runValidators: true,
        }
      );
      res.send("User Update");
    } else {
      res.status(400).send("Update not allowed");
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});
connectDB()
  .then(() => {
    console.log("database successfully connected");
    app.listen(8000, () => console.log("Server is running on port 8000"));
  })
  .catch((err) => {
    console.log(err);
  });
