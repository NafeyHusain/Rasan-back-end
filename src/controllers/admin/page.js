const Page = require("../../models/page");

exports.createPage = (req, res) => {
    console.log(req.files);
    console.log(req.body);
    const { banners, products } = req.files;
    if (banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    }
    if (products !== null && products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    }
    req.body.createdBy = req.user._id;

    Page.findOne({ category: req.body.category })
        .then((page) => {
            if (page) {
                Page.findOneAndUpdate({ category: req.body.category }, req.body)
                    .then((updatedPage) => {
                        if (updatedPage) {
                            return res.status(201).json({ page: updatedPage });
                        } else {
                            return res.status(400).json({ error });
                        }
                    })
                    .catch((err) => {
                        return res.status(400).json({ message: err.toString() });
                    });
            } else {
                const page = new Page(req.body);

                page.save()
                    .then((page) => {
                        if (page) {
                            return res.status(201).json({
                                page,
                            });
                        } else {
                            return res.status(400).json({
                                error,
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
            return res.status(400).json({ message: err.toString() });
        });
};
exports.getPage = (req, res) => {
    const { cid, type } = req.params;

    if (type === "page") {
        Page.findOne({ category: cid })
            .then((page) => {
                if (page) {
                    return res.status(200).json({ page });
                } else {
                    console.log("No page found");
                }
            })
            .catch((err) => {
                return res.status(404).json({ err });
            });
    }
};
