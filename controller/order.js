const Order = require('../models/order')


// ------------ Create an order -----------
exports.createOrder =
    async (req, res) => {
        const order = new Order({
            pname: req.body.pname,
            pqty: req.body.pqty,
            isDelivered: req.body.isDelivered,
            userId: req.user._id,
        })
        try {
            order.save()
            res.status(201).json({ success: true, message: "Order has been placed successfully." })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

// ----------- Display single order -----------
exports.showSingle =
    async (req, res) => {
        const orderid = req.params.id
        Order.findOne({ _id: orderid })
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (e) {
                res.status(500).json({ error: e })
            })
    }


    // ----------- Display orders of specified user -----------
exports.showOrderOf =
async (req, res) => {
    const id = req.user._id
    Order.find({ userId: id }).populate("userId")
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })
}
exports.showOneOrderOf =
async (req, res) => {
    const id = req.params.id
    Order.findOne({ _id: id }).populate("userId")
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (e) {
            console.log(e)
            res.status(500).json({ error: e })
        })
}
// ----------- Display all order -----------
exports.showAll =
    async (req, res) => {
        Order.find().populate("userId")
            .then(function (data) {
                res.status(200).json(data)
            })
            .catch(function (e) {
                res.status(500).json({ error: e })
            })
    }

// ----------- Delete an order ---------------
exports.delete =
    async (req, res) => {
        const orderid = req.params.id
        Order.deleteOne({ _id: orderid })
            .then(res.send({
                message: "Order deleted successfully", status: true
            }))
            .catch(function (err) {
                res.status(500).json({ error: err })
            })
    }

// -------------- Update an order ---------
exports.updateOrder =
    async (req, res) => {
        const pname = req.body.pname;
        const pqty = req.body.pqty;
        const orderid = req.params.id

        Order.updateOne({ _id: orderid }, {
            pname: pname,
            pqty: pqty,
        })
            .then(function (d) {
                res.status(200).json({ message: "Order has been updated." })
            })
            .catch(function (e) {
                res.status(500).json({ error: e })
            })
    }

// -------------- Update an order ---------
exports.updateOrder =
    async (req, res) => {
        const pname = req.body.pname;
        const pqty = req.body.pqty;
        const orderid = req.params.id

        Order.updateOne({ _id: orderid }, {
            pname: pname,
            pqty: pqty,
        })
            .then(function (d) {
                res.status(200).json({ message: "Order has been updated." })
            })
            .catch(function (e) {
                res.status(500).json({ error: e })
            })
    }