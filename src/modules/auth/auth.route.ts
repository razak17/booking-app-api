import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { loginHandler, registerHandler } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";

const router = express.Router();

router.post("/login", processRequestBody(loginSchema.body), loginHandler);
router.post("/register", processRequestBody(registerSchema.body), registerHandler);

export default router;

