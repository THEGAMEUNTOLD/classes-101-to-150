import {Router} from 'express'
import {register} from "../Controllers/Auth.controller.js";
import { registerValidator } from '../Validators/Auth.validator.js';
import { verifyEmail } from "../Controllers/Auth.controller.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username,email,password}
 */
authRouter.post("/register", registerValidator ,register);


authRouter.get("/verify-email", verifyEmail);

export default authRouter