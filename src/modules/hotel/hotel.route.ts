import express from "express";
import requireAdmin from "../../middleware/requireAdmin";
import { processRequestBody } from "zod-express-middleware";
import {
  createHotelHandler,
  deleteHotelHandler,
  getAllHotelsHandler,
  getHotelHandler,
  hotelsCountByCityHandler,
  updateHotelHandler,
} from "./hotel.controller";
import { createHotelSchema } from "./hotel.schema";

const router = express.Router();

//Create
router.post(
  "/",
  processRequestBody(createHotelSchema.body),
  requireAdmin,
  createHotelHandler
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
router.get("/countByType", countByType);
router.get("/room/:hotelId", getHotelRooms);

export default router;
