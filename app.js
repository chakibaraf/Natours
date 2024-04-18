const express = require("express");


const app = express();
const morgan = require("morgan");

const tourRouter = require("./route/tourRoutes");
const userRouter = require("./route/userRoutes");

//first middlewear

// middlewear pour permettre d'utiliser les json

// MIDDLEWEARS
app.use(morgan("dev"));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("hello from middlewear😄 ");
  next();
});

app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

// permet d'avoir acces et lire le file

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
