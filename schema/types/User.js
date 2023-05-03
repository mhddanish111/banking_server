module.exports = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    mobile: String
    address: String
    city: String
    state: String
    postalCode: String
    occupation: String
    income: String
    govtId: String
    govtIdNumber: String
    createdDate: String
    updatedDate: String
    isActive: Boolean
    userType: String
    message: String
    aadhaarNumber: String
    panNumber: String
}
input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String
    mobile: String!
    address: String!
    city: String!
    state: String!
    postalCode: String!
    occupation: String!
    income: String!
    govtId: String
    govtIdNumber: String
    aadhaarNumber: String!
    panNumber: String!
}

type Login {
    userId: ID
    token: String
    firstName: String
    lastName: String
    message: String
    isValid: Boolean
    userType: String
}

type ChangePassword {
    message: String
    success: Boolean
    data: User
}

input LogInInput {
    email: String!
    password: String!
}

input ChangePasswordInput {
    oldPassword: String!
    newPassword: String!
}

type Query {
    userDetails: User
    login(logInInput: LogInInput): Login
}

type Mutation {
    createUser(userInput: UserInput): User
    changePassword(changePasswordInput: ChangePasswordInput): ChangePassword
}
`