const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  create: async (req) => {
    try {
      const user = await User.findOne({ email: req.userInput.email });
      if (user) {
        return { message: "user already exist" };
      }
      const hashedPassword = await bcrypt.hash(req.userInput.password, 12);
      const userData = new User({
        ...req.userInput,
        password: hashedPassword,
        isActive: true,
        userType: "user",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        message: "",
      });
      return await userData.save();
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return {
          message: "User credential is not correct.",
          isValid: false,
        };
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        return {
          message: "User credential is not correct.",
          isValid: false,
        };
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "someSuperSecretKey",
        {
          expiresIn: "5d",
        }
      );
      const { id, firstName, lastName, userType } = user;
      return {
        userId: id,
        firstName: firstName,
        lastName: lastName,
        token: token,
        isValid: true,
        message: "",
        userType: userType,
      };
    } catch (err) {
      throw err;
    }
  },
  userDetails: async (args, context) => {
    try {
      const { userId } = context;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("user credential is not correct!");
      }
      return { ...user._doc, password: "" };
    } catch (err) {
      throw err;
    }
  },
  changePassword: async (req, context) => {
    try {
      const { changePasswordInput } = req;
      const { oldPassword, newPassword } = changePasswordInput;
      const { userId } = context;
      if (oldPassword === newPassword) {
        return { message: "old and new password is same", success: false };
      }
      const user = await User.findById(userId);
      if (!user) {
        return { message: "user is not exist", success: false };
      }
      const oldHashedPassword = await bcrypt.hash(oldPassword, 12);
      if(user.password === oldHashedPassword){
        return { message: "Choose different password from old password", success: false };
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      const updateStatus = await User.findByIdAndUpdate(
        { _id: userId },
        { $set: { password: hashedPassword } },
        { new: true }
      );
      return {
        data: { ...updateStatus, password: null },
        message: "Your data is update successfully",
        success: true,
      };
    } catch (err) {
      throw err;
    }
  },
};
