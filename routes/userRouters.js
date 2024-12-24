const express = require("express");
const Router = express.Router();
const {userController} = require("../controllers");
const validation = require("../validation/users/userValidation");
// const { upload } = require("../Middlewares/multiStoreMiddleware");

Router.post(
  "/register",
  // upload.single("profilePic"),
  validation.registerUserValidation,
  userController.userSignup
);
Router.post(
  "/login",
  validation.loginUserValidation,
  userController.userLogin
);
module.exports = Router;
