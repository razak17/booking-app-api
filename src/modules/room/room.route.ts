import express from "express";
import requireAdmin from "../../middleware/requireAdmin";
import { processRequestBody } from "zod-express-middleware";
import { createRoomSchema } from "./room.schema";
import { createRoomHandler, updateRoomAvailabilityHandler, updateRoomHandler } from "./room.controller";

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
router.delete("/:roomId", requireAdmin, deleteHotelHandler);

//Get
router.get("/find/:roomId", getHotelHandler);

//Get all hotels
router.get("/", getAllHotelsHandler);

export default router;
