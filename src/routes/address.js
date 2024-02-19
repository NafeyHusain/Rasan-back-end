const express = require("express");

const { requireSignin, userMiddleWare } = require("../common-middleware");
const { addAddress, getAddress } = require("../controllers/address");
const router = express.Router();

router.post("/user/address/create", requireSignin, userMiddleWare, addAddress);
router.post("/user/getAddress", requireSignin, userMiddleWare, getAddress);

module.exports = router;
