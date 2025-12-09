const userModel = require('../models/userModel')
const expenseModel = require('../models/expenseModel')

const authToAct = async (userId, resourseId, res) => {
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
module.exports = authToAct