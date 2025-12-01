const express = require("express");
const morgan = require("morgan");
const app = express();

const authRoute = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// Middleware
app.use(morgan("dev"));
app.use(express.json());

app.use("/expense_tracker/v1", authRoute);
app.use("/expense_tracker/v1", userRouter);

module.exports = app;
