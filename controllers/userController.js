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
      await user.save()

      res.status(201).json({
          message:`Password Updated Successfully`
      })
      
  } catch (er) {
    console.log(err);
  }
};
