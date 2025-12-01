const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userModel.create({ name, email, password });
    const token = generateToken(loggedInUser._id);
    res.status(201).json({
        message: `User Registered Successfully`,
        token,
      newUser,
    });
  } catch (err) {
    console.log(`User NOT created Successfully 💥`);
    console.log(err);
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // include the password field (it's `select: false` in the schema)
    const loggedInUser = await userModel.findOne({ email }).select("+password");
    if (!loggedInUser) {
      return res.status(401).json({
        message: `Invalid Credentials`,
      });
    }
    const isMatch = await loggedInUser.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: `Invalid Credentials`,
      });
    }
    const token = generateToken(loggedInUser._id);

    res.status(200).json({
      message: `Login Successful`,
      token,
      User: {
        name: loggedInUser.name,
        email: loggedInUser.email,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
exports.protect = async (req, res, next) => {
    try {
        let token;
        //Get Token from Header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1]
        }
        //Verify the Token Gotten
        if (!token) res.status(401).json({
            message:`Please Login!`
        })
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        //decode the user from the Token
        const user = await userModel.findById(decodedToken.id).select("-password")
        if (!user) res.status(401).json({ message: `Invalid user` })
        //Fetch the user and attach to req.user
        req.user = user
        //Allow the request to contine to the next middleware
        next()
    }
    catch (err) {
        console.log(err)
    }
}
