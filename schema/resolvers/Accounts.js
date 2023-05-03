const AccountLib = require("../../libs/Accounts");
module.exports = {
  Query: {
    accounts: async (_, args, context) => {
      return AccountLib.getAccount(args, context);
    },
    accountWithType: async (_, args, context) => {
      return AccountLib.getAccountWithType(args, context);
    },
  },

  Mutation: {
    createAccount: async (_, args, context) => {
      return AccountLib.createAccount(args, context);
    },
  },
};
