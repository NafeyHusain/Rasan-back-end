const express = require("express");
const { signup, signin, signout } = require("../../controllers/admin/auth");
const { validateSignUpRequest, isRequestValidated, validateSigninRequest } = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/admin/signout", signout);

module.exports = router;
