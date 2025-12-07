const express = require("express");
const morgan = require("morgan");
const authRoute = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const qs = require('qs');

const app = express();


// Middleware
app.set("query parser",(str)=>qs.parse(str))
app.use(express.json());
app.use(morgan("dev"));

//Routers 
app.use("/expense_tracker/v1", authRoute);
app.use("/expense_tracker/v1", userRouter);
app.use("/expense_tracker/v1", expenseRouter);

module.exports = app;
