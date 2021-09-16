const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    productName : {
        type : String
    },
    productImage : {
        type : String
    },
    productPrice : {
        type : String
    },
    productDescription : {
        type : String
    },
    productQuantity : {
        type : String
    },
    productComment : {
        type : String
    }
})

module.exports = Product