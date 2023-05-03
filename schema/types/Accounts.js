module.exports = `
type Account {
    _id:ID
    accountNumber: Float
    accountType: String
    categoryName: String
    minAmount: Float
    maxAmount: Float
    amount: Float
    limit: Float
    charge: Float
    accountTypeId: ID
    categoryId: ID
    userId: ID
    message: String
    type: String
    debitCardNumber: Float
    debitCardCSVNumber: Float
    expiryMonth: Float
    expiryYear: Float
    users: [User]
}

input AccountInput {
    type: String
    accountType: String
    categoryName: String
    minAmount: Float
    maxAmount: Float
    limit: Float
    charge: Float
    accountTypeId: ID
    categoryId: ID
}

input AccountWithTypeInput {
    userId: ID!
    type: String!
}

type Query {
    accounts: [Account]
    accountWithType(accountWithTypeInput:AccountWithTypeInput):[Account]
}
type Mutation {
    createAccount(accountInput: AccountInput): Account
}
`;
