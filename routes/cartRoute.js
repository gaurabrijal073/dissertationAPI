const express = require("express")
const router = express.Router();
const CartController = require("../controller/cart")
const auth = require('../middleware/auth');

router.post("/cart/addtocart", auth.verifyUser, CartController.addItemToCart);
router.put(
  "/cart/removeItem/:productId", auth.verifyUser,
  CartController.removeCartItems
);
router.put(
  "/cart/minusItem/:productId", auth.verifyUser,
  CartController.decreaseCartItems
);

router.get("/cart/getItems", auth.verifyUser, CartController.getSingleCart);
router.delete("/cart/emptyCart/:userId", auth.verifyUser, CartController.emptyCart);
// router.post("/cart/dropItem", verifyUser, CartController.dropItem);

module.exports = router;