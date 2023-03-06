const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected successfully");
    })
    .catch((err) => {
      console.error("error connecting to mongo db", err.message);
    });
};

module.exports = connect;
