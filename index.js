const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");

const dbconfig = require("./dbconfig");
const userRouter = require("./routes/user");
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/api", userRouter);

const PORT = process.env.PORT || 8080;
sql.connect(dbconfig, (err) => {
  if (err) {
    throw err;
  }
  app.listen(PORT);
  console.log(`app is running on port ${PORT}`);
});
