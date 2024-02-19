const express = require("express");

const { requireSignin, userMiddleWare } = require("../common-middleware");
const { addOrder, getOrders, getOrder } = require("../controllers/order");

const router = express.Router();

router.post("/addOrder", requireSignin, userMiddleWare, addOrder);
router.get("/getOrders", requireSignin, userMiddleWare, getOrders);

router.post("/getOrder", requireSignin, userMiddleWare, getOrder);

module.exports = router;
