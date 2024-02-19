const express = require("express");
const { initialData } = require("../../controllers/admin/initialData");
const { requireSignin, adminMiddleWare } = require("../../common-middleware");

const router = express.Router();

router.post("/initialdata", requireSignin, adminMiddleWare, initialData);

module.exports = router;
