const expenseModel = require("../models/expenseModel");
const userModel = require("../models/userModel");

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword && !newPassword)
      res
        .status(401)
        .json({ message: `Both curent and new passwords are required` });
    const user = await userModel.findById(req.user._id).select("+password");
    if (!user)
      res
        .status(401)
        .json({ message: `Please Login before you can change password` });
    if (!(await user.matchPassword(currentPassword)))
      res.status(401).json({ message: `Current password is not correct` });

    user.password = newPassword;
    await user.save();

    res.status(201).json({
      message: `Password Updated Successfully`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};
exports.editUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) res.status(401).json({ message: `user no longer exist` });
    const { email, name } = req.body;
    if (email) user.email = email;
    if (name) user.name = name;
    await user.save();
    res.status(200).json({
      message: `Updated Successfully`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};
exports.getProfile = async (req, res, next) => {
  const user = await userModel.findById(req.user._id).populate({
    path: "expenses",
    select: "-__v -updatedAt -createdAt ",
  });
  if (!user) {
    throw new Error("Please Log in !");
  }
  const message = `Welcome ${user.name}`;
  res.status(200).json({
    message,
    user,
  });
};
exports.getMyExpense = async (req, res, next) => {
  const userId = req.user._id;
  if (!(await userModel.findById(userId))) {
    throw new Error("Please Login!")
  }
  const expenses = await expenseModel.find({ user: userId }).select("-__v -updatedAt -createdAt")
  
  const message =
    expenses.length > 1
      ? `${req.user.name}! You have ${expenses.length} expenses`
      : `${req.user.name}! You have only ${expenses.length} expenses`;
  
  const messages = expenses.length< 1? `${req.user.name}! You don't have any expenses yet!`:message
  res.status(200).json({
    messages,
    expenses
  })
}
