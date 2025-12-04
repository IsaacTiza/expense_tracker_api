const express = require("express");
const morgan = require("morgan");
const app = express();

const authRoute = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes")

// Middleware
app.use(morgan("dev"));
app.use(express.json());

//Routers 
app.use("/expense_tracker/v1", authRoute);
app.use("/expense_tracker/v1", userRouter);
app.use("/expense_tracker/v1", expenseRouter);

module.exports = app;
