import express from "express";
import requireAdmin from "../../middleware/requireAdmin";
import requireUser from "../../middleware/requireUser";
import { processRequestBody } from "zod-express-middleware";
import {
  deleteUserHandler,
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
} from "./user.controller";
import { updateUserSchema } from "./user.schema";

const router = express.Router();

// Get current user
router.get("/me", (_, res) => {
  return res.send(res.locals.user);
});

// Update user
router.put(
  "/:userId",
  processRequestBody(updateUserSchema.body),
  requireUser,
  updateUserHandler
);

// Delete user
router.delete("/:userId", requireUser, deleteUserHandler);

// Get user
router.get("/:userId", requireUser, getUserHandler);

// Get all users
router.get("/", requireAdmin, getAllUsersHandler);

export default router;
