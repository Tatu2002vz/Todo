const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

// const { createServer } = require("http");
// const socketModule = require("./modules/socket");
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const port = process.env.PORT || 9999;
// app.use("/images", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["*"]
  })
);

dbConnect();
initRoutes(app);
// const server = createServer(app);

// socketModule(server);

app.get('/', (req, res) => {
    return res.status(200).json('Hello');
})

//-------------------------------------
app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
