const AccountType = require('../../libs/AccountType');
const AccountCategory = require('../../models/AccountCategory');
module.exports = {
  Query: {
    accountType: async (_, args) => {
      return await AccountType.getAccountType();
    },
    accountCategory: async (_, args) => {
      return await AccountType.getAccountCategory();
    },
  },
  Mutation: {
    createAccountType: async (_, args) => {
      return await AccountType.createAccount(args);
    },
    createAccountCategory: async (_, args) => {
      return await AccountType.createCategory(args);
    },
  },
};
