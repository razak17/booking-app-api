import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateRoomBody, CreateRoomParams } from "./room.schema";
import {
  createRoom,
  deleteRoom,
  updateRoom,
  updateRoomAvailability,
} from "./room.service";

export const createRoomHandler = async (
  req: Request<CreateRoomParams, {}, CreateRoomBody>,
  res: Response
) => {
  const { hotelId } = req.params;
  try {
    const newRoom = await createRoom({ ...req.body }, hotelId);
    return res.status(StatusCodes.OK).json(newRoom);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const updateRoomHandler = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    const updatedRoom = await updateRoom(
      roomId,
      { ...req.body },
      { new: true }
    );

    return res.status(StatusCodes.OK).json(updatedRoom);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const updateRoomAvailabilityHandler = async (
  req: Request,
  res: Response
) => {
  const { roomId } = req.params;
  const { dates } = req.body;

  try {
    const updatedRoom = await updateRoomAvailability(roomId, dates);
    return res.status(StatusCodes.OK).json(updatedRoom);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const deleteRoomHandler = async (req: Request, res: Response) => {
  try {
    const { hotelId, roomId } = req.params;
    await deleteRoom(roomId, hotelId);
    return res.status(StatusCodes.OK).send("Room has been deleted.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export async function getHotelHandler(req: Request, res: Response) {
  const { hotelId } = req.params;
  try {
    const hotel = await getHotelById(hotelId);
    if (!hotel) {
      return res.status(StatusCodes.NOT_FOUND).send("Hotel not found.");
    }
    return res.status(StatusCodes.OK).send(hotel);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function getAllHotelsHandler(req: Request, res: Response) {
  try {
    const hotels = await getAllHotels();
    if (!hotels) {
      return res.status(StatusCodes.NOT_FOUND).send("Hotels not found.");
    }
    return res.status(StatusCodes.OK).json(hotels);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
