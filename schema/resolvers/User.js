const userLib = require("../../libs/User");
module.exports = {
  Query: {
    login: async (_, args) => {
      return await userLib.login(args.logInInput);
    },
    userDetails: async (_, args, context) => {
      return await userLib.userDetails(args, context);
    },
  },
  Mutation: {
    createUser: async (_, args, context) => {
      return await userLib.create(args);
    },
    changePassword: async (_, args, context) => {
      return await userLib.changePassword(args, context);
    }
  }
  
};
