// src/Routes/Auth.Routes.js
import express from "express";
import { registerUser, loginUser } from "../Controllers/Auth.Controller.js";
import { registerValidator, loginValidator } from "../Validators/Auth.Validators.js"; // fixed typo
import validateRequest from "../Middlewares/validateRequest.js"; // fixed casing

const router = express.Router();

// Register Route
router.post("/register", registerValidator, validateRequest, registerUser);

// Login Route
router.post("/login", loginValidator, validateRequest, loginUser);

export default router;