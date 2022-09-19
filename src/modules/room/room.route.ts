import express from "express";
import requireAdmin from "../../middleware/requireAdmin";
import { processRequestBody } from "zod-express-middleware";
import { createRoomSchema } from "./room.schema";
import {
  createRoomHandler,
  deleteRoomHandler,
  getRoomHandler,
  updateRoomAvailabilityHandler,
  updateRoomHandler,
} from "./room.controller";

const router = express.Router();

//Create
router.post(
  "/:hotelId",
  processRequestBody(createRoomSchema.body),
  requireAdmin,
  createRoomHandler
);

//Update
router.put("/:roomId", requireAdmin, updateRoomHandler);
router.put("/availability/:roomId", updateRoomAvailabilityHandler);

//Delete
router.delete("/:roomId/:hotelId", requireAdmin, deleteRoomHandler);

//Get
router.get("/:roomId", getRoomHandler);

//Get all rooms
router.get("/", getAllRoomsHandler);

export default router;
