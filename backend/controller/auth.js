const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const statusCode = require("../enum/statusCode");
const user = require("../model/user");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const sendMail = require("../utils/sendMail");
const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  if (!name) throw new Error("Name is required");
  const exist = await User.findOne({ email });
  if (exist) throw new Error(`Email ${email} is existing!`);
  const newUser = await User.create({
    email: email,
    password: password,
    name: name,
  });
  if (newUser)
    return res.status(statusCode.CREATED).json({
      mes: "New user created",
      newUser,
    });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  const exist = await User.findOne({ email });
  if (!exist) throw new Error("Email isn't available!");
  if (exist.isCorrectPassword(password)) {
    const payload = { id: exist._id, email: exist.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const rs = jwt.verify(token, process.env.SECRET_KEY);
    const { password, ...userData } = exist.toObject();
    return res.status(statusCode.OK).json({
      mes: {...userData, token},
    });
  }
  // throw new Error("Password is incorrect");
  res.status(statusCode.UNAUTHORIZED).json({
    mes: "Password is incorrect",
  });
});

const getCurrent = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).select("-password");
  return res.status(statusCode.OK).json({
    mes: user,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Invalid email");
  // if(!user) throw new Error('Email is not available');
  const randomToken = randomstring.generate();
  const expiredIn = Date.now() + 1 * 60 * 1000;
  const resetPassToken = `${randomToken}-${expiredIn}`;
  const user = await User.findOneAndUpdate(
    { email },
    { resetPassToken: resetPassToken },
    { new: true }
  );
  if (!user) {
    throw new Error("Email is not existing");
  }

  const subject = "Quên mật khẩu";
  const html = `Vui lòng click vào link dưới đây để cập nhật lại mật khẩu của bạn. Link sẽ hết hạn sau 15 phút. <a href="${process.env.SERVER_URL}/reset-password/${user._id}/${randomToken}">Link</a>`;
  await sendMail({ to: email, subject, html });
  return res.status(statusCode.OK).json({
    mes: "Please check your email to continue!",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  if (!token) throw new Error("Invalid token");
  const user = await User.findById(id);
  if (token === user.resetPassToken.split("-")[0]) {
    if (Date.now() > user.resetPassToken.split("-")[1])
      throw new Error("Token expired");
    user.password = password;
    user.resetPassToken = "";
    await user.save();
    return res.status(statusCode.OK).json({
      mes: "Change password successfully",
    });
  }
  throw new Error("Token incorrect");
});
module.exports = {
  register,
  login,
  getCurrent,
  forgotPassword,
  resetPassword,
};
