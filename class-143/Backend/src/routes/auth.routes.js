import { Router } from "express";
import { validateRegisterUser } from "../validator/auth.validator.js";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();


/**
 * @Required email, password, fullname, contact, role
 * @Description Register a new user
 */
router.post("/register", validateRegisterUser, registerUser)

export default router