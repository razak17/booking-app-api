import express from "express";
import requireAdmin from "../../middleware/requireAdmin";
import { processRequestBody } from "zod-express-middleware";
import { createRoomSchema } from "./room.schema";
import { createRoomHandler } from "./room.controller";

const router = express.Router();

//Create
router.post(
  "/:hotelId",
  processRequestBody(createRoomSchema.body),
  requireAdmin,
  createRoomHandler
);

//Update
router.put("/:hotelId", requireAdmin, updateHotelHandler);

//Delete
router.delete("/:hotelId", requireAdmin, deleteHotelHandler);

//Get
router.get("/find/:hotelId", getHotelHandler);

//Get all hotels
router.get("/", getAllHotelsHandler);

//Filter
router.get("/countByCity", hotelsCountByCityHandler);
router.get("/countByType", hotelsCountByTypeHandler);
// router.get("/room/:hotelId", hotelRoomsHandler);

export default router;
