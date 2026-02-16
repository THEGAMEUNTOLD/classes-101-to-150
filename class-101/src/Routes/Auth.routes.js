const express = require("express");

const {
  RegisterController,
  LoginController,
  LogoutController
} = require("../controllers/Auth.controllers");

const AuthRoutes = express.Router();

// ================= REGISTER =================
AuthRoutes.post("/register", RegisterController);

// ================= LOGIN =================
AuthRoutes.post("/login", LoginController);

// ================= LOGOUT =================
AuthRoutes.post("/logout", LogoutController);

module.exports = AuthRoutes;
