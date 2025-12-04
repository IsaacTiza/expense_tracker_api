const userModel = require("../models/userModel")
const expenseModel = require("../models/expenseModel")


exports.createExpense = async (req, res, next) => {
    const { name, amount, date, category, paymentMethod } = req.body
    const loggedUser = await userModel.findById(req.user._id)
    if (!loggedUser) {
        throw new Error("User doesn't exit! Please Log in")
    }
    const user = loggedUser._id
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
        expense
    })
}