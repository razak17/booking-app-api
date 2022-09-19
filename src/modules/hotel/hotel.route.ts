import express from "express";
import requireAdmin from "../../middleware/requireAdmin";
import { processRequestBody } from "zod-express-middleware";
import { createHotelHandler } from "./hotel.controller";
import { createHotelBody } from "./hotel.schema";

const router = express.Router();

//Create
router.post("/", processRequestBody(createHotelBody.body), requireAdmin, createHotelHandler);

//Update
router.put("/:id", requireAdmin, updateHotel);

//Delete
router.delete("/:id", requireAdmin, deleteHotel);

//Get
router.get("/find/:id", getHotel);

//Get all
router.get("/", getHotels);

//Filter
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
