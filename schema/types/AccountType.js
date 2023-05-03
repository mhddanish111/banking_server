module.exports = `
type AccountType {
    _id: ID
    name: String
    type: String
    isActive: Boolean
    category: [AccountCategory]
}
type AccountCategory {
    _id: ID
    name: String
    benefit: [String]
    isActive: Boolean
    minAmount: Float
    maxAmount: Float
    limit: Float
    charge: Float
    accountTypeId: AccountType
    accountTypes: AccountType
}
input InputAccountType {
    name: String
    type: String
}
input InputAccountCategory {
    name: String
    benefit: [String]
    minAmount: Float
    maxAmount: Float
    limit: Float
    charge: Float
    accountTypeId: String,
}
type Query  {
    accountType: [AccountType]
    accountCategory: [AccountCategory]
}
type Mutation {
    createAccountType(typeInput: InputAccountType): AccountType
    createAccountCategory(categoryInput: InputAccountCategory): AccountCategory
}
`