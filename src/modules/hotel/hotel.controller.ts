import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createHotelBody } from "./hotel.schema";
import {
  createHotel,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./hotel.service";

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
