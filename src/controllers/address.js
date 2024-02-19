const UserAddress = require("../models/address");

exports.addAddress = (req, res) => {
    const { payload } = req.body;

    if (payload.address) {
        if (payload.address._id) {
            UserAddress.findOneAndUpdate(
                { user: req.user._id, "address._id": payload.address._id },
                {
                    $set: {
                        "address.$": payload.address,
                    },
                }
            )
                .then((address) => {
                    if (address) {
                        res.status(201).json({ address });
                    } else {
                        return res.status(400).json({ message: "address is empty " });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({ message: err.toString() });
                });
        } else {
            UserAddress.findOneAndUpdate(
                { user: req.user._id },
                {
                    $push: {
                        address: payload.address,
                    },
                },
                { new: true, upsert: true }
            )
                .then((address) => {
                    if (address) {
                        res.status(201).json({ address });
                    } else {
                        return res.status(400).json({ message: "address is empty " });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({ message: err.toString() });
                });
        }
    } else {
        res.status(400).json({ error: "Params AddressRequired" });
    }
};

exports.getAddress = (req, res) => {
    UserAddress.findOne({ user: req.user._id })
        .then((userAddress) => {
            return res.status(200).json({ userAddress });
        })
        .catch((err) => {
            return res.status(400).json({ message: err.toString() });
        });
};
