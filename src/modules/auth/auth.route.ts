import express from "express";
import { processRequestBody } from "zod-express-middleware";
import {
  loginHandler,
  registerHandler,
  logoutHandler,
} from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.post("/login", processRequestBody(loginSchema.body), loginHandler);
router.post(
  "/register",
  processRequestBody(registerSchema.body),
  registerHandler
);
router.post("/logout", requireUser, logoutHandler);

export default router;
