const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  
  try {

    const user = await userSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist ! Invalid Email-Id",
      });
    }
    // check password is correct or not
    // console.log(req.body.password,user.password);
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }

    // create and assign a token first parameter data second parameter secret key

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "Email-Id already exists ",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new userSchema(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

const currentUserController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ _id: req.body.userId });
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    // console.log("catch currentUserController")
    res.send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { loginController, registerController, currentUserController };
