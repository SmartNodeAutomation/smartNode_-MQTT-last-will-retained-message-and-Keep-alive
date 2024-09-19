const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyparser = require("body-parser");

const cors = require("cors");
app.use(cors());
// Set the json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
//routes
const indexRouter = require("./routes/index");
require("./utils/messageHandler");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", indexRouter);

app.use((err, req, res, next) => {
  err.statuCode = err.statusCode(500);
  err.message = err.message("Internal Server Error");
  res.status(err.statuCode).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
