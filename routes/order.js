const express = require('express')
const router = express.Router();

const OrderController = require('../controller/order')
const auth = require('../middleware/auth');

// Create an order
router.post('/order/create', auth.verifyUser, auth.verifyCustomer, OrderController.createOrder)

// Display single order
router.get('/order/show/:id', auth.verifyUser, OrderController.showSingle)

// Display all order
router.get('/order/show', auth.verifyUser, OrderController.showAll)

// Display specific customer order
router.get('/order/showOf', auth.verifyUser, OrderController.showOrderOf)

// Display specific customer order
router.get('/order/showOf/:id', auth.verifyUser, OrderController.showOneOrderOf)

// Delete an order
router.delete('/order/delete/:id',auth.verifyUser, auth.verifyCustomer, OrderController.delete)

// Update an order
router.put('/order/update/:id',auth.verifyUser, auth.verifyCustomer, OrderController.updateOrder)

module.exports = router;