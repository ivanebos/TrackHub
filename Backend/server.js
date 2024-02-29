const express = require("express");
const mongoose = require("mongoose");
const logRoutes = require("./routes/logs");
require("dotenv").config();
//express
const app = express();

app.use("/Track", logRoutes);

//connect to db
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    //listen for reqests
    app.listen(process.env.PORT, () => {
      console.log("Connected to MongoDB. Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("ERROR: ", error);
  });
