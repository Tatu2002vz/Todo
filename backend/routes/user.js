const router = require("express").Router();
const ctrl = require("../controller/user");
const { verifyToken } = require("../middleware/verifyToken");
router.put("/", [verifyToken], ctrl.updateUser);
module.exports = router;
