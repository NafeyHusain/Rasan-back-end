const jwt = require("jsonwebtoken");
const express = require("express");

const multer = require("multer");
const shortId = require("shortid");
const path = require("path");

const { createProduct, getProductsBySlug } = require("../controllers/product");
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortId.generate() + "-" + file.originalname);
    },
});
exports.upload = multer({ storage });

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    next();
};

exports.userMiddleWare = (req, res, next) => {
    if (req.user._role === "user") {
        return res.status(400).json({ message: "User access denied" });
    }
    next();
};

exports.adminMiddleWare = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).json({ message: "access denied" });
    }

    next();
};
