const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userData = new User({
    firstName: "Niketa",
    lastName: "Sikarwar",
    emailId: "nik.niketa@gmail.com",
    password: "Admin@123",
  });
  try {
    await userData.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Bad Request: ");
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
