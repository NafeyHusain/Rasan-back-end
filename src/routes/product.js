const express = require("express");
const { requireSignin, adminMiddleWare } = require("../common-middleware");
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");

const {
    createProduct,
    getProductsBySlug,
    getProductDetailsById,
    deleteProductById,
    getProducts,
} = require("../controllers/product");
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

router.post("/product/create", requireSignin, adminMiddleWare, upload.array("productPicture"), createProduct);
router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);

router.delete("/product/deleteProductById", requireSignin, adminMiddleWare, deleteProductById);
router.post("/product/getProducts", requireSignin, adminMiddleWare, getProducts);

module.exports = router;
