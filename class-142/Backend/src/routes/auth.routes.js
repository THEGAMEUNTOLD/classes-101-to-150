import { Router } from "express";
import { validateRegisterUser } from "../validator/auth.validator.js";

const router  = Router();


/**
 * @Required email, password, fullname, contact, role
 * @Description Register a new user
 */
router.post("/register",validateRegisterUser,)

export default router