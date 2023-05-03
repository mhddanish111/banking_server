const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  minAmount: {
    type: Number,
    required: true,
  },
  maxAmount: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    default: 0,
  },
  charge: {
    type: Number,
    default: 0,
  },
  benefit: {
    type: [String],
    default: [],
  },
  accountTypeId: {
    type: Schema.Types.ObjectId,
    ref: "AccountType",
  },
});

module.exports = mongoose.model("AccountCategory", AccountCategorySchema);
