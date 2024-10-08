const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://namastenode:PG6ws2*xY_2c3HJ@namastenode.zi5r7.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
