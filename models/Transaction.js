const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
  },
  transactionByAccount: {
    type: Number,
  },
  userAccountType: {
    type: String
  },
  accountType: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  withdrawalAmount: {
    type: Number,
    default: 0,
  },
  depositAmount: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
  transactionRemark: {
    type: String,
  },
  transactionType: {
    type: String,
  },
  transactionDate: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Accounts",
  },
});

module.exports = mongoose.model("Transactions", TransactionsSchema);
