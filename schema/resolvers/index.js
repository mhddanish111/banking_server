const { mergeResolvers } = require("@graphql-tools/merge");

const user = require("./User");
const AccountType = require("./AccountType");
const Accounts = require("./Accounts");
const Transaction = require("./Transaction");

const resolvers = [user, AccountType, Accounts, Transaction];

module.exports = mergeResolvers(resolvers);
