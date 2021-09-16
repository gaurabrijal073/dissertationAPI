const mongoose = require('mongoose')


const User = mongoose.model('User', {
    fullName: {
        type: String,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        unique : true,
        trim: true,
        required: [true, 'Please enter your email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: 8,
        // select: false
    },
    mobileNumber: {
        type: String,
        required: [true, 'Please enter your mobile number']
    },
    address: {
        type: String,
        required: [true, 'Please enter your address']
    },
    userProfile : {
        type : String
    },
    role : {
        type : String,
        enum : ["customer", "admin"],
        default : "customer"
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
})

module.exports = User