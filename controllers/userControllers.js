require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModelSchema");
const config = require("../config/index")

const userSignup = async (req, res) => {
  const regData = await new userSchema(req.body);
  isEmailExists = await userSchema.findOne({
    email: req.body.email,
  });
  if (isEmailExists != null) {
    res.status(409).json({
      success: "failure",
      message: "User already exists with this email",
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      regData.password = await bcrypt.hash(req.body.password, salt);
      // const filePath = `uploads${req.file.filename}`;
      // regData.profilePic = filePath;
      await regData.save();
      res.status(201).json({
        success: "success",
        message: "Registered successfully",
      });
    } catch (err) {
      res.status(400).json({
        success: "failure",
        error: "Error occure " + err.message,
      });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await userSchema.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        const tokenData = {name:user.name,id:user._id ,email: user.email}
        if (user.email === email && isMatch) {
          const token = jwt.sign(
            tokenData,
            config.jwtSecret,
            { expiresIn: config.jwtExpiresIn }
          );
          res.status(200).send({
            success: "success",
            message: "Login success",
            userDetails: {
              userName: user.name,
              id:user._id,
              email: user.email,
              createdAt:user.createdAt
            },
            token: token,
          });
        } else {
          res.status(401).send({
            success: "failure",
            error: "Email or Password is not valid",
          });
        }
      } else {
        res.status(401).send({
          success: "failure",
          error: "You are not valid register user",
        });
      }
    }
  } catch (Error) {
    res.status(400).send({
      success: "failure",
      error: "Error occure " + Error.message,
    });
  }
};



module.exports = {
  userSignup,
  userLogin,
};
