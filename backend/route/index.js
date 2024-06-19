const userRouter = require("./user");
const authRouter = require("./auth");
const todoRouter = require("./todo");

const { notFound, errHandle } = require("../middleware/errorHanle");
const initRoutes = (app) => {
  app.use("/", authRouter);

  app.use("/user", userRouter);
  app.use("/todo", todoRouter);

  app.use(notFound);
  app.use(errHandle);
};

module.exports = initRoutes;
