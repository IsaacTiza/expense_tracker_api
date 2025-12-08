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

exports.getMonthlyStats = async (req, res, next) => {
  const stats = await expenseModel.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: {
          year: { $year: `$date` },
          month: { $month: `$date` },
        },
        totalAmount: { $sum: `$amount` },
        averageAmount: { $avg: `$amount` },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        year: `$_id.year`,
        moth: `$_id.month`,
        totalAmount: 1,
        averageAmount: 1,
        count: 1,
      },
    },
    { $sort: { year: -1, month: -1 } },
  ]);
  res.json({ stats });
};
exports.getCategoryStats = async (req, res, next) => {
  const categoryStats = await expenseModel.aggregate([
    { $match: { user: req.user._id } },
    {
      $group: {
        _id: `$category`,
        totalAmount: { $sum: `$amount` },
      },
    },
    {
      $project: {
        _id: 0,
        category: `$_id`,
        totalAmount: 1,
      },
    },
    { $sort: { totalAmount: -1 } },
  ]);
    res.status(200).json({categoryStats})
};
exports.getPaymentMethodStats = async (req, res, next) => {
    const paymentMethodStats = await expenseModel.aggregate([
        { $match: { user: req.user._id } },
        {
            $group: {
                _id: `$paymentMethod`,
                totalAmount: { $sum: `$amount` }
            }
        },
        {
            $project: {
                _id: 0,
                paymentMethod: `$_id`,
                totalAmount: 1
            }
        },
        { $sort: { totalAmount: -1 } }
    ]);
    res.json({paymentMethodStats})
}
exports.getTopCategory = async (req, res, next) => {
    const topCategory = await expenseModel.aggregate([
        { $match: { user: req.user._id } },
        {
            $group: {
                _id: `$catgory`,
                totalAmount:{$sum:`$amount`}
            }
        },
        {
            $project: {
                _id: 0,
                category: `$_id`,
                totalAmount:1
            }
        },
        { $sort: { totalAmount: -1 } },
        {$limit:1}
    ])
    res.json({topCategory})
}

