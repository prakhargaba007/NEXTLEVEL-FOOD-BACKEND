const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app = express();
port = 8080;

const foodDataRoutes = require("./routes/foodData");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.json());
app.use("/meals", foodDataRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.oiz6t6r.mongodb.net/foodAppData?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then((res) => {
    app.listen(port);
    console.log(`App listening on port ${port}!`);
  })
  .catch((err) => {
    console.log(err);
  });
