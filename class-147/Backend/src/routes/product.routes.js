import express from "express";
import { AuthenticateSeller } from "../middleware/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import { validateProductCreation } from "../validator/product.validator.js";
import muiter from "multer";

const upload = muiter({
    storage: muiter.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

const router = express.Router();

router.post("/", AuthenticateSeller, validateProductCreation, upload.array("images", 7), createProduct);

export default router;