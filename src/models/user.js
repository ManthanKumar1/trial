const mongoose = require('mongoose')

let userSchema = new mongoose.Schema ({
    firstName: String,
    lastName: String,
    mobile: String,
    emailId: String,
    password: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    age: Number
}, {timestamps: true})


module.exports = mongoose.model('userJWT', userSchema)