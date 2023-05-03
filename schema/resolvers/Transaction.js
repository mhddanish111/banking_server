const Transaction = require("../../libs/Transaction");
module.exports = {
    Query : {
        transaction: async (_, args) => {
            return await Transaction.transaction(args);
        }
    }, 
    Mutation: {
        deposit: async (_, args, context) => {
            return await Transaction.deposit(args, context);
        },
        withdrawal: async (_, args, context) => {
            return await Transaction.withdrawal(args, context);
        }
    }
}