const express = require("express");
const cookieParser = require("cookie-parser");

const AuthRoutes = require("./Routes/Auth.routes");

const App = express();

App.use(express.json());
App.use(cookieParser());

App.use("/api/auth", AuthRoutes);

module.exports = App;
