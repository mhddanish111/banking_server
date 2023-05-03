const mongoose = require("mongoose");
const Accounts = require("../models/Accounts");
const Utils = require("../utils");
module.exports = {
  createAccount: async (req, context) => {
    try {
      const {
        accountType,
        categoryName,
        charge,
        limit,
        maxAmount,
        minAmount,
        accountTypeId,
        categoryId,
        type,
      } = req?.accountInput;
      const { userId } = context;
      const account = await Accounts.findOne({
        userId,
        type,
        accountTypeId,
        categoryId,
      });
      if (account) {
        return {
          message: `you already have this type of account and your account number is ${account.accountNumber}`,
        };
      }
      let number = Math.floor(Date.now() + Math.random());
      const { month, expiryYear } = Utils.getMonthYear();
      let amount = 10000;
      let debitCardNumber = 0;
      let debitCardCSVNumber = 0;
      if (type === "Cards") {
        number = Math.floor((Date.now() + Math.random()) * 999);
        amount = limit;
      }
      if (type === "Accounts") {
        debitCardNumber = Math.floor((Date.now() + Math.random()) * 999);
        debitCardCSVNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      }
      const accountData = new Accounts({
        accountNumber: number,
        amount,
        accountType,
        categoryName,
        charge,
        limit,
        maxAmount,
        minAmount,
        type,
        debitCardNumber,
        debitCardCSVNumber,
        expiryMonth: month,
        expiryYear,
        accountTypeId: mongoose.Types.ObjectId(accountTypeId),
        categoryId: mongoose.Types.ObjectId(categoryId),
        userId: mongoose.Types.ObjectId(userId),
      });
      return await accountData.save();
    } catch (err) {
      throw err;
    }
  },
  getAccount: async (req, context) => {
    try {
      let { userId } = context;
      userId = mongoose.Types.ObjectId(userId);
      return new Promise((resolve, reject) => {
        return Accounts.aggregate([
          { $match: { userId }},
          {
            $lookup: {
              from: "users",
              as: "users",
              localField: "userId",
              foreignField: "_id",
            },
          },
          {
            $project: {
              _id: 1,
              accountType: 1,
              accountNumber: 1,
              amount: 1,
              categoryId: 1,
              categoryName: 1,
              minAmount: 1,
              maxAmount: 1,
              charge: 1,
              limit: 1,
              accountTypeId: 1,
              categoryId: 1,
              userId: 1,
              type: 1,
              debitCardNumber: 1,
              debitCardCSVNumber: 1,
              expiryYear: 1,
              expiryMonth: 1,
              users: 1,
            },
          },
        ]).exec(async (error, response) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        });
      });
    } catch (error) {
      throw error;
    }
  },
  getAccountWithType: async (req) => {
    try {
      let { userId, type } = req?.accountWithTypeInput;
      userId = mongoose.Types.ObjectId(userId);
      return new Promise((resolve, reject) => {
        return Accounts.aggregate([
          { $match: { userId, type }},
          {
            $lookup: {
              from: "users",
              as: "users",
              localField: "userId",
              foreignField: "_id",
            },
          },
          {
            $project: {
              _id: 1,
              accountType: 1,
              accountNumber: 1,
              amount: 1,
              categoryId: 1,
              categoryName: 1,
              minAmount: 1,
              maxAmount: 1,
              charge: 1,
              limit: 1,
              accountTypeId: 1,
              categoryId: 1,
              userId: 1,
              type: 1,
              debitCardNumber: 1,
              debitCardCSVNumber: 1,
              expiryYear: 1,
              expiryMonth: 1,
              users: 1,
            },
          },
        ]).exec(async (error, response) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        });
      });
    } catch (error) {
      throw error;
    }
  },
};
