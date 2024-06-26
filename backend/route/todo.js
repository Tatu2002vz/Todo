const router = require("express").Router();
const ctrl = require("../controller/todo");
const { verifyToken } = require("../middleware/verifyToken");
router.get("/", [verifyToken], ctrl.getAllTodos);
router.get('/expired', [verifyToken], ctrl.getTodoExpired)
router.get('/completed', [verifyToken], ctrl.getTodoCompleted)
router.get('/important', [verifyToken], ctrl.getTodoImportant)
router.post("/", [verifyToken], ctrl.addTodo);
router.post('/search', [verifyToken], ctrl.searchTodo)
router.get("/:id", [verifyToken], ctrl.getTodo);
router.put("/:id", [verifyToken], ctrl.updateTodo);
router.delete("/:id", [verifyToken], ctrl.deleteTodo);
module.exports = router;
