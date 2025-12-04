const userModel = require("../models/userModel");
const expenseModel = require("../models/expenseModel");

exports.createExpense = async (req, res, next) => {
  const { name, amount, date, category, paymentMethod } = req.body;
  const loggedUser = await userModel.findById(req.user._id);
  if (!loggedUser) {
    throw new Error("User doesn't exit! Please Log in");
  }
  const user = loggedUser._id;
  const expense = await expenseModel.create({
    name,
    amount,
    date,
    category,
    paymentMethod,
    user,
  });
  res.status(201).json({
    message: `Expense created Succefully`,
    expense,
  });
};
exports.editExpense = async (req, res, next) => {
  const expenseId = req.params.id;
  const expense = await expenseModel.findById(expenseId);
  if (!(await userModel.findById(req.user._id))) {
    throw new Error("Please Log in!");
  }
console.log(expense.user,req.user._id);
  if (!(expense.user.equals(req.user._id))) {
    throw new Error("You are not the creator of this Expense!");
  }
  const { name, amount, date, category, paymentMethod,currency } = req.body;
  if (name) expense.name = name;
  if (amount) expense.amount = amount;
  if (date) expense.date = date;
  if (category) expense.category = category;
  if (paymentMethod) expense.paymentMethod = paymentMethod;
  if (currency) expense.currency = currency;

  const savedExpense = await expense.save();

  res.status(201).json({
    message: ` Expenses Edited Successfully`,
    savedExpense,
  });
};
