const express = require("express");
const { addCategory, getCategory, updateCategories, deleteCategories } = require("../controllers/category");
const { requireSignin, adminMiddleWare } = require("../common-middleware");
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortId.generate() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.post("/category/create", requireSignin, adminMiddleWare, upload.single("categoryImage"), addCategory);
router.get("/category/getCategory", getCategory);

router.post("/category/update", upload.array("categoryImage"), updateCategories);
router.post("/category/delete", deleteCategories);

module.exports = router;
