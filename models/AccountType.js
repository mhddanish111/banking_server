const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    category : {
        type: Schema.Types.ObjectId,
        ref: 'AccountCategory'
    },
    
})

module.exports = mongoose.model("AccountType", AccountTypeSchema)