const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const profileRouter = require("./routes/profile");
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("database successfully connected");
    app.listen(8000, () => console.log("Server is running on port 8000"));
  })
  .catch((err) => {
    console.log(err);
  });
