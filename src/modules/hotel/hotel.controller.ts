import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createHotelBody } from "./hotel.schema";
import { createHotel, deleteHotel } from "./hotel.service";

export const createHotelHandler = async (
  req: Request<{}, {}, createHotelBody>,
  res: Response
) => {
  try {
    const newHotel = await createHotel( { ...req.body });
    return res.status(StatusCodes.OK).json(newHotel);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const deleteHotelHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {hotelId} = req.params;
    const newHotel = await deleteHotel(hotelId);
    return res.status(StatusCodes.OK).send("Hotel has been deleted.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }



};
