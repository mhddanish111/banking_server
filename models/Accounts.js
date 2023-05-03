const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountsProps = new Schema({
  accountNumber: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  minAmount: {
    type: Number,
    required: true,
  },
  maxAmount: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 0,
  },
  charge: {
    type: Number,
    default: 0,
  },
  debitCardNumber: {
    type: Number,
    default: 0,
  },
  debitCardCSVNumber: {
    type: Number,
    default: 0,
  },
  expiryYear: {
    type: Number,
    default: 0,
  },
  expiryMonth:{
    type: Number,
    default: 0,
  },
  accountTypeId: {
    type: Schema.Types.ObjectId,
    ref: "AccountType",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "AccountCategory",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Accounts", accountsProps);
