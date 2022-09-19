import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createHotelBody } from "./hotel.schema";
import { createHotel, deleteHotel, updateHotel } from "./hotel.service";

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

export const updateHotelHandler = async (
  req: Request,
  res: Response
) => {
  const { hotelId } = req.params;

  try {
    const updatedHotel = await updateHotel(
      hotelId,
      { ...req.body },
      { new: true }
    );

    return res.status(StatusCodes.OK).json(updatedHotel);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const deleteHotelHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { hotelId } = req.params;
    await deleteHotel(hotelId);
    return res.status(StatusCodes.OK).send("Hotel has been deleted.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};
