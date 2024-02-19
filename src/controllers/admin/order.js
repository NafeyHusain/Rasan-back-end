const order = require("../../models/order");

exports.updateOrder = (req, res) => {
    order
        .updateOne(
            { _id: req.body.orderId, "orderStatus.type": req.body.type },
            {
                $set: {
                    "orderStatus.$": [{ type: req.body.type, date: new Date(), isCompleted: true }],
                },
            }
        )
        .then((order) => {
            if (order) {
                return res.status(200).json({ order });
            } else {
                console.log("No page found");
            }
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};

exports.getCustomerOrders = async (req, res) => {
    const orders = await order.find({}).populate("items.productId", "name").exec();
    res.status(200).json({ orders });
};
