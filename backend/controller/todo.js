const statusCode = require("../enum/statusCode");
const Todo = require("../model/todo");
const asyncHandler = require("express-async-handler");

const getAllTodos = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const allTodos = await Todo.find({ userID: id });
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
  return res.status(statusCode.OK).json({
    mes: newTodo,
  });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const todo_id = req.params.id;
  const { content, description, expired, status } = req.body;

  if (!content) throw new Error("Invalid content");
  const data = {
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
  const newTodo = await Todo.findOneAndUpdate(
    { _id: todo_id, userID: id },
    data,
    { new: true }
  );
  console.log(newTodo);
  if (!newTodo) throw new Error("Update failed");
  return res.status(statusCode.OK).json({
    mes: newTodo,
  });
});

const deleteTodo = async (req, res) => {
  const todo_id = req.params.id;
  const deleteTodo = await Todo.findByIdAndDelete(todo_id);
  if(!deleteTodo) throw new Error("Delete failed!");
  return res.status(statusCode.OK).json({
    mes: 'Delete successfully'
  })

};
module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo
};