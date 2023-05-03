const { mergeTypeDefs } = require("@graphql-tools/merge");

const User = require("./User");
const AccountType = require("./AccountType");
const Accounts = require("./Accounts");
const Transaction = require("./Transaction");

const types = [User, AccountType, Accounts, Transaction];

module.exports = mergeTypeDefs(types);
