const express = require("express");
const app = express();
const { authAdmin, authUser } = require("./MiddleWares/auth");

app.use("/admin", authAdmin);
app.get("/admin", (req, res) => {
  res.send("Hello Admin");
});
app.post("/admin", (req, res) => {
  res.send("Hello Admin Post");
});
app.use("/user", authUser, (req, res) => {
  throw new Error("Error");
  res.status(500).send("some error occured");
});
app.use("/", (req, res, next) => {
  res.end("Hello from Server");
});

app.listen(8000, () => console.log("Server is running on port 8000"));
