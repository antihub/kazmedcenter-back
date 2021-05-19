const path = require('path');
const dotenv = require('dotenv').config({
    path: path.resolve(
      process.cwd(),
      `.env`,
    ),
  });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

Object.assign(process.env, dotenv.parsed);

const PORT = process.env.PORT;
const DB_KEY = process.env.DB_KEY;

const requestRouter = require('./router/request-router');
const courseRouter = require('./router/course-router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/requests', requestRouter);
app.use('/courses', courseRouter);
mongoose
  .connect(DB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.listen(PORT || 3030, () => {
console.log("Server is running...");
});