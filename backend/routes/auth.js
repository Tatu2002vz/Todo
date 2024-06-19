const router = require("express").Router();
const ctrl = require("../controller/auth");
const { verifyToken } = require("../middleware/verifyToken");
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/current", [verifyToken], ctrl.getCurrent);
router.post("/forgotPassword", ctrl.forgotPassword);
router.post("/reset-password/:id/:token", ctrl.resetPassword);
module.exports = router;
