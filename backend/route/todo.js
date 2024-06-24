const router = require("express").Router();
const ctrl = require("../controller/todo");
const { verifyToken } = require("../middleware/verifyToken");
router.get("/", [verifyToken], ctrl.getAllTodos);
router.post("/", [verifyToken], ctrl.addTodo);
router.get("/:id", [verifyToken], ctrl.getTodo);
router.put("/:id", [verifyToken], ctrl.updateTodo);
router.delete("/:id", [verifyToken], ctrl.deleteTodo);
module.exports = router;
