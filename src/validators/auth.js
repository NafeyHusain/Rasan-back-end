const { check } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateSignUpRequest = [
    check("firstName").notEmpty().withMessage("First Name Empty"),
    check("lastName").notEmpty().withMessage("Last Name Empty"),
    check("email").isEmail().withMessage("Valid Email required"),
    check("password").isLength({ min: 6 }).withMessage("password criteria not matched"),
];
exports.validateSigninRequest = [
    check("email").isEmail().withMessage("Valid Email required"),
    check("password").isLength({ min: 6 }).withMessage("password criteria not matched"),
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            error: errors.array()[0].msg,
        });
    }
    next();
};
