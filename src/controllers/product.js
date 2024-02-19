const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/categories");

exports.createProduct = (req, res) => {
    const { name, price, description, quantity, category, createdBy } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename };
        });
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        quantity,
        productPictures,
        category,
        createdBy: req.user._id,
    });

    product
        .save()
        .then((product) => {
            if (product) {
                return res.status(201).json({
                    product,
                });
            }
        })
        .catch((error) => {
            return res.status(400).json({
                error,
            });
        });
};

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select("_id type")
        .then((category) => {
            if (category) {
                Product.find({ category: category._id })
                    .then((products) => {
                        if (category.type) {
                            if (products.length > 0) {
                                return res.status(200).json({
                                    products,
                                    priceRange: {
                                        under5k: 5000,
                                        under10k: 10000,
                                        under15k: 15000,
                                        under20k: 20000,
                                    },
                                    productsByPrice: {
                                        under5k: products.filter((product) => product.price <= 5000),
                                        under10k: products.filter(
                                            (product) => product.price > 5000 && product.price <= 10000
                                        ),
                                        under15k: products.filter(
                                            (product) => product.price > 10000 && product.price <= 15000
                                        ),
                                    },
                                });
                            }
                        } else {
                            res.status(200).json({ products });
                        }
                    })
                    .catch((error) => {
                        return res.status(400).json({
                            error,
                        });
                    });
            }
        })
        .catch((error) => {
            return res.status(400).json({
                error,
            });
        });
};

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
        Product.findOne({ _id: productId })
            .then(async (product) => {
                if (product) {
                    res.status(200).json({ product });
                } else {
                    return res.status(404).json({ message: err.toString() });
                }
            })
            .catch((err) => {
                return res.status(400).json({ message: err.toString() });
            });
    }
};

// new update
exports.deleteProductById = (req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
        Product.deleteOne({ _id: productId })
            .then((product) => {
                if (product) {
                    res.status(200).json({ product });
                } else {
                    return res.status(404).json({ message: err.toString() });
                }
            })
            .catch((err) => {
                return res.status(400).json({ message: err.toString() });
            });
    } else {
        res.status(400).json({ error: "Params required" });
    }
};

exports.getProducts = async (req, res) => {
    const products = await Product.find({})
        .select("_id name price quantity slug description productPictures category")
        .populate({ path: "category", select: "_id name" })
        .exec();

    res.status(200).json({ products });
};
