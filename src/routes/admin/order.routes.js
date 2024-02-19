const express = require("express");
const { requireSignin, adminMiddleWare } = require("../../common-middleware");
const { updateOrder, getCustomerOrders } = require("../../controllers/admin/order");

const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleWare, updateOrder);
router.post(`/order/getCustomerOrders`, requireSignin, adminMiddleWare, getCustomerOrders);

module.exports = router;
