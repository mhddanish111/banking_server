module.exports = `
scalar Date
type Count {
    offset: Float
    limit: Float
    totalCount: Float
}

type Transaction {
    _id: ID
    transactionId: String
    accountNumber: Float
    amount: Float
    withdrawalAmount: Float
    depositAmount: Float
    transactionRemark: String
    transactionDate: Date
    accountType: String
    categoryName: String
    transactionType: String
}

type TransactionData {
    count: Count
    result: [Transaction]
}

type TransactionResult {
    transactionResult: Transaction
    accounts: [Account]
}

input DepositInput {
    accountNumber: Float
    payeeAccountNumber: Float
    amount: Float
    accountType: String
}

input WithdrawalInput {
    accountNumber: Float
    amount: Float
    accountType: String
}

input TransactionInput {
    accountNumber: Float, 
    offset: Float, 
    limit: Float,
    fromDate: Date,
    toDate: Date,
    showAll: Boolean,
    last10Transaction: Boolean
    customSearch: Boolean

}

type Query {
 transaction(transactionInput: TransactionInput): TransactionData
}

type Mutation {
deposit(depositInput: DepositInput): TransactionResult
withdrawal(withdrawalInput: WithdrawalInput): TransactionResult
}
`;
