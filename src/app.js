const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const validator = require("validator");
const signupValidation = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());
app.post("/signup", async (req, res) => {
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
app.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId) || emailId === "") {
      throw new Error("Invalid EmailId");
    }
    const user = await User.findOne({ emailId: emailId });
    console.log(user.password);
    if (!user) {
      throw new Error("User is not valid");
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.send("Login successfull " + user.firstName);
      } else {
        throw new Error("Invalid credential");
      }
    }
  } catch (err) {
    res.status(400).send("Login Error: " + err.message);
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
  const { firstName, lastName, password, about, skill, photoURL } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const forUpdate = [
      "firstName",
      "lastName",
      "password",
      "about",
      "skill",
      "photoURL",
    ];
    const isFieldUpdatable = Object.keys(req.body).every((x) =>
      forUpdate.includes(x)
    );
    // if (data?.skill.length > 10) {
    //   throw new Error("UpdateOnly 10 skills allowed");
    // }
    if (isFieldUpdatable) {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        {
          firstName,
          lastName,
          password: passwordHash,
          about,
          skill,
          photoURL,
        },
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
