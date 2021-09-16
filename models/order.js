const mongoose = require("mongoose");

const Order = new mongoose.Schema(
    {
        pname: {
            type: String,
            required: [true, "Enter name of product"],
            trim: true
        },
        pqty: {
            type: Number,
            required: [true, "Enter quantity of product"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        isDelivered: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

module.exports = mongoose.model("Order", Order);
