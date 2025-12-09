const express = require("express");

//Importing security middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const morgan = require("morgan");

// Importing routes
const authRoute = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const qs = require("qs");

//App initialization
const app = express();

// Middleware
app.use(express.json({ limit: "10kb" })); // Body parser, reading data from body into req.body
app.use((req,res,next)=>{
    req.query = { ...req.query };
    next()
})
const limiter = rateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000,
  message: "Too many requests from this IP, please try again after 10 minutes",
});

// Security Middleware
// app.use(mongoSanitize({
//     // // dryRun: false,
//     // // allowDots: true,
//     // exclude:['query']

//     replaceWith:"_",
// }));
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("common"));
}
app.use("/expense_tracker", limiter);
// app.use(xss());
app.use(hpp());
app.use(cors());


app.set("query parser", (str) => qs.parse(str));
//Routers
app.use("/expense_tracker/v1", authRoute);
app.use("/expense_tracker/v1", userRouter);
app.use("/expense_tracker/v1", expenseRouter);

//Exporting App
module.exports = app;
