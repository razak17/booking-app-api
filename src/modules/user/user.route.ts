import express from "express";
import requireAdmin from "src/middleware/requireAdmin";
import requireUser from "src/middleware/requireUser";
import { processRequestBody } from "zod-express-middleware";
import { deleteUserHandler, getUserHandler, updateUserHandler } from "./user.controller";

const router = express.Router();

// Get current user
router.get("/me", (_, res) => {
  return res.send(res.locals.user);
});

// Update user
router.put("/:id", requireUser, updateUserHandler);

// Delete user
router.delete("/:id", requireUser, deleteUserHandler);

// Get user
router.get("/:id", requireUser, getUserHandler);

// Get all users
router.get("/", requireAdmin, getAllUsersHandler);



export default router;
