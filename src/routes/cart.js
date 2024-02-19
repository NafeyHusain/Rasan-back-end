const express = require("express");

const { addItemToCart, getCartItems, removeCartItems } = require("../controllers/cart");
const { requireSignin, userMiddleWare } = require("../common-middleware");
const router = express.Router();

router.post("/user/cart/addtocart", requireSignin, userMiddleWare, addItemToCart);
router.post("/user/getAllCartItems", requireSignin, userMiddleWare, getCartItems);
router.post("/user/cart/removeItem", requireSignin, userMiddleWare, removeCartItems);

module.exports = router;
