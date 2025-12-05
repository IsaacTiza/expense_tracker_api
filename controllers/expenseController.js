const userModel = require("../models/userModel");
const expenseModel = require("../models/expenseModel");

const authToAct = async (userId, resourseId, req, res) => {
  try {
    if (!(await userModel.findById(userId))) {
      res.status(401).json({
        message: `Please Login`,
      });
    }
    if (!(await expenseModel.findById(resourseId)).user.equals(userId)) {
      res.status(403).json({
        message: `You are not the creator of this resource`,
      });
    }
    return true;
  } catch (err) {
    console.log(err);
  }
};

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
  if (authToAct(req.user._id, expenseId, req, res)) {
    const { name, amount, date, category, paymentMethod, currency } = req.body;
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
  }
};
exports.deleteExpense = async (req, res, next) => {
  const expenseId = req.params.id;
  if (authToAct(req.user._id, expenseId, req, res)) {
    await expenseModel.deleteOne({ _id: expenseId });

    res.status(204).json({
      message: `Deleted Succeessfully`,
    });
  }
};
exports.getUsersExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    //   console.log(expenseId)
    //   console.log((await expenseModel.findById(expenseId)).user);
    //   console.log(`Begin Debug`)
    // console.log((await expenseModel.findById(expenseId)).user.equals(req.user._id));

    const expense = await expenseModel.findById(expenseId);
    if (!expense) {
      res.status(401).json({
        message: `Expense doesn't exist`,
      });
    }
    if (await authToAct(req.user._id, expenseId, req, res)) {
      const reqMaker = req.user._id;

      res.status(200).json({
        expense,
        reqMaker,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
