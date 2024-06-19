const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const statusCode = require("../enum/statusCode");
const updateUser = asyncHandler(async (req, res) => {
  console.log(req.cookie);
  const { name } = req.body;
  const { id } = req.user;
  if (!name) throw new Error("Invalid name");
  if (!id) throw new Error("Invalid id");
  const user = await User.findByIdAndUpdate(id, { name }, { new: true });
  if (!user) throw new Error("User not found");
  return res.status(statusCode.OK).json({
    mes: "Updated successfully",
  });
});

module.exports = {
  updateUser,
};
