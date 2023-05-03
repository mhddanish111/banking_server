const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const Accounts = require("../models/Accounts");
const AccountsLib = require("./Accounts");
module.exports = {
  deposit: async (args, context) => {
    const { depositInput } = args;
    const { userId } = context;
    const { accountNumber, payeeAccountNumber, amount, accountType } =
      depositInput;
    const userAccount = await Accounts.findOne({ accountNumber });
    const payeeAccount = await Accounts.findOne({
      accountNumber: payeeAccountNumber,
    });
    if (!payeeAccount || !userAccount) {
      throw new Error("Account number does not exist");
    }
    const receivedAmount = parseFloat(amount);
    const userAmount = parseFloat(userAccount.amount);
    if (receivedAmount > userAmount || receivedAmount === 0) {
      throw new Error("Amount is not valid");
    }
    const userUpdatedAmount = userAmount - receivedAmount;
    await Accounts.findByIdAndUpdate(
      { _id: userAccount.id },
      { $set: { amount: userUpdatedAmount } },
      { new: true }
    );

    const userTransactionData = new Transaction({
      transactionId: Math.random().toString(36).slice(2),
      accountNumber,
      transactionByAccount: accountNumber,
      accountType: userAccount.accountType,
      categoryName: userAccount.categoryName,
      userAccountType: userAccount.type,
      withdrawalAmount: receivedAmount,
      depositAmount: 0,
      amount: userUpdatedAmount,
      transactionRemark: "",
      transactionType: "Debit",
      transactionDate: new Date().toISOString(),
      accountId: userAccount.id,
      userId: mongoose.Types.ObjectId(userId),
    });
    await userTransactionData.save();
    const payeeUpdatedAmount = parseFloat(payeeAccount.amount) + receivedAmount;
    await Accounts.findByIdAndUpdate(
      { _id: payeeAccount.id },
      { $set: { amount: payeeUpdatedAmount } },
      { new: true }
    );

    const payeeTransactionData = new Transaction({
      transactionId: Math.random().toString(36).slice(2),
      accountNumber: payeeAccountNumber,
      transactionByAccount: accountNumber,
      accountType: payeeAccount.accountType,
      categoryName: payeeAccount.categoryName,
      userAccountType: payeeAccount.type,
      withdrawalAmount: 0,
      depositAmount: receivedAmount,
      amount: payeeUpdatedAmount,
      transactionRemark: "",
      transactionType: "Credit",
      transactionDate: new Date(),
      accountId: payeeAccount.id,
      userId: mongoose.Types.ObjectId(userId),
    });

    const transactionResult = await payeeTransactionData.save();
    const accountWithTypeInput = {
      userId,
      type: accountType,
    };
    const accounts = await AccountsLib.getAccountWithType({
      accountWithTypeInput,
    });
    return {
      transactionResult,
      accounts,
    };
  },
  withdrawal: async (args, context) => {
    const { withdrawalInput } = args;
    const { userId } = context;
    const { accountNumber, amount, accountType } = withdrawalInput;
    const userAccount = await Accounts.findOne({ accountNumber });
    if (!userAccount) {
      throw new Error("Account number does not exist");
    }
    const receivedAmount = parseFloat(amount);
    const userAmount = parseFloat(userAccount.amount);
    if (receivedAmount > userAmount || receivedAmount === 0) {
      throw new Error("Amount is not valid");
    }
    const userUpdatedAmount = userAmount - receivedAmount;
    await Accounts.findByIdAndUpdate(
      { _id: userAccount.id },
      { $set: { amount: userUpdatedAmount } },
      { new: true }
    );

    const userTransactionData = new Transaction({
      transactionId: Math.random().toString(36).slice(2),
      accountNumber,
      transactionByAccount: accountNumber,
      accountType: userAccount.accountType,
      categoryName: userAccount.categoryName,
      userAccountType: userAccount.type,
      withdrawalAmount: receivedAmount,
      depositAmount: 0,
      amount: userUpdatedAmount,
      transactionRemark: "",
      transactionType: "Debit",
      transactionDate: new Date(),
      accountId: userAccount.id,
      userId: mongoose.Types.ObjectId(userId),
    });
    const transactionResult = await userTransactionData.save();
    const accountWithTypeInput = {
      userId,
      type: accountType,
    };
    const accounts = await AccountsLib.getAccountWithType({
      accountWithTypeInput,
    });
    return {
      transactionResult,
      accounts,
    };
  },

  transaction: async (args) => {
    const { transactionInput } = args;
    const {
      accountNumber,
      fromDate = "",
      toDate = "",
      showAll = true,
      last10Transaction = false,
      customSearch = false,
      offset = 0,
      limit = 10,
    } = transactionInput;
    const count = await Transaction.aggregate([
      { $match: { accountNumber } },
      { $group: { _id: null, total: { $sum: 1 } } },
    ]);
    let totalCount = count?.length > 0 ? count[0].total : 0;
    const pageLimit = parseInt(limit, 10);
    const pageNo = parseInt(offset, 10);
    const skip = parseInt(pageLimit * pageNo, 10);
    let aggregateQuery = [
      { $match: { accountNumber } },
      { $sort: { transactionDate: -1 } },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(limit),
      },
    ];
    if (last10Transaction) {
      aggregateQuery = [
        { $match: { accountNumber } },
        { $sort: { transactionDate: -1 } },
        {
          $skip: 0,
        },
        {
          $limit: 10,
        },
      ];
      totalCount = 10;
    }
    const data = await Transaction.aggregate(aggregateQuery);
    const result = {
      count: {
        offset,
        limit,
        totalCount,
      },
      result: data,
    };
    return result;
  },
};
