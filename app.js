const express = require("express");
const morgan = require("morgan");
const app = express();

const authRoute = require("./routes/authRoutes");

// Middleware
app.use(morgan("dev"));
app.use(express.json());

app.use("/expense_tracker/v1", authRoute);

module.exports = app;
