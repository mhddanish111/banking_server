const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    income: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    govtId: {
        type: String,
        default: "",
    },
    govtIdNumber: {
        type: String,
        default: "",
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
        default: Date.now(),
    },
    isActive : {
        type: Boolean,
        default: true
    },
    aadhaarNumber: {
        type: String,
        required: true,
    },
    panNumber: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: "user"
    }
})

module.exports = mongoose.model('User', userSchema);