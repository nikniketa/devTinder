const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.end("Hello from Server");
});

app.listen(8000, () => console.log("Server is running on port 8000"));
