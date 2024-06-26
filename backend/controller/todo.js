const statusCode = require("../enum/statusCode");
const Todo = require("../model/todo");
const asyncHandler = require("express-async-handler");
const slugify = require('slugify')
const getAllTodos = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const allTodos = await Todo.find({ userID: id }).sort("expired");
  return res.status(statusCode.OK).json({
    mes: allTodos,
  });
});

const addTodo = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { content, description, expired, status } = req.body;

  if (!content) throw new Error("Invalid content");
  const data = {
    userID: id,
    content: content,
    description: description,
    expired: expired,
    status: status,
  };
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (!data[key]) delete data[key];
    }
  }
  const newTodo = await Todo.create(data);
  if (!newTodo) throw new Error("Create failed");
  return res.status(statusCode.CREATED).json({
    mes: newTodo,
  });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const todo_id = req.params.id;
  const { content, description, expired, status, important } = req.body;

  // if (!content) throw new Error("Invalid content");
  const data = {
    content: content,
    description: description,
    expired: expired,
    status: status,
    important: important,
  };
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] === undefined || data[key] === "") delete data[key];
    }
  }
  const newTodo = await Todo.findOneAndUpdate(
    { _id: todo_id, userID: id },
    data,
    { new: true }
  );

  if (!newTodo) throw new Error("Update failed");
  return res.status(statusCode.OK).json({
    mes: newTodo,
  });
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo_id = req.params.id;
  const deleteTodo = await Todo.findByIdAndDelete(todo_id);
  if (!deleteTodo) throw new Error("Delete failed!");
  return res.status(statusCode.OK).json({
    mes: "Delete successfully",
  });
});

const getTodo = asyncHandler(async (req, res) => {
  const todo_id = req.params.id;
  if (!todo_id) throw new Error("Invalid id!");
  const todo = await Todo.findById(todo_id);
  if (!todo) throw new Error("No existing todo");
  return res.status(statusCode.OK).json({
    mes: todo,
  });
});

const getTodoExpired = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const allTodos = await Todo.find({
    userID: id,
    status: "incomplete",
    expired: { $lt: Date.now() },
  }).sort("expired");
  return res.status(statusCode.OK).json({
    mes: allTodos,
  });
});
const getTodoCompleted = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const allTodos = await Todo.find({ userID: id, status: "completed" }).sort(
    "expired"
  );
  return res.status(statusCode.OK).json({
    mes: allTodos,
  });
});
const getTodoImportant = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const allTodos = await Todo.find({ userID: id, important: true }).sort(
    "expired"
  );
  return res.status(statusCode.OK).json({
    mes: allTodos,
  });
});
const searchTodo = asyncHandler(async (req, res) => {
  const { id } = req.user;
  let { search } = req.body;
  if (!search) search = "";
  const regex_content = new RegExp(search.trim(), "i");
  const regex_slugify = new RegExp(slugify(search.trim()), "i");
  const todo = await Todo.find({ userID: id, content: regex_content });
  return res.status(statusCode.OK).json({
    mes: todo,
  });
});
module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  getTodoExpired,
  getTodoCompleted,
  searchTodo,
  getTodoImportant,
};
