const address = require("../models/address");
const cart = require("../models/cart");
const Order = require("../models/order");

exports.addOrder = (req, res) => {
    cart.deleteOne({ user: req.user._id })
        .then((result) => {
            if (result) {
                req.body.user = req.user._id;
                req.body.orderStatus = [
                    {
                        type: "ordered",
                        date: new Date(),
                        isCompleted: true,
                    },
                    {
                        type: "packed",
                        isCompleted: false,
                    },
                    {
                        type: "shipped",
                        isCompleted: false,
                    },
                    {
                        type: "delivered",
                        isCompleted: false,
                    },
                ];
                const order = new Order(req.body);
                order
                    .save()
                    .then((order) => {
                        if (order) {
                            return res.status(201).json({
                                order,
                            });
                        }
                    })
                    .catch((error) => {
                        return res.status(400).json({
                            error,
                        });
                    });
            }
        })
        .catch((err) => {
            return res.status(400).json({
                error,
            });
        });
};

exports.getOrders = (req, res) => {
    Order.find({ user: req.user._id })
        .select("_id paymentStatus items")
        .populate("items.productId", "_id name productPictures")
        .then((orders) => {
            if (orders) {
                return res.status(200).json({ orders });
            } else {
                return res.status(404).json({ message: err.toString() });
            }
        })
        .catch((err) => {
            return res.status(400).json({ message: err.toString() });
        });
};

exports.getOrder = (req, res) => {
    Order.findOne({ _id: req.body.orderId })
        .populate("items.productId", "_id name productPictures")
        .lean()
        .then((order) => {
            if (order) {
                console.log(order);

                address
                    .findOne({ user: req.user._id })
                    .then((address) => {
                        if (address) {
                            order.address = address.address.find(
                                (adr) => adr._id.toString() == order.addressId.toString()
                            );
                            res.status(200).json({ order });
                        } else {
                            return res.status(404).json({ message: error.toString() });
                        }
                    })
                    .catch((error) => {
                        return res.status(404).json({ message: error.toString() });
                    });
            } else {
                return res.status(404).json({ message: err.toString() });
            }
        })
        .catch((error) => {
            return res.status(400).json({ message: error.toString() });
        });
};
