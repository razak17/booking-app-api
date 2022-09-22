import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateRoomBody, CreateRoomParams } from "./room.schema";
import {
  createRoom,
  deleteRoom,
  updateRoom,
  updateRoomAvailability,
  getRoomById,
  getAllRooms
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
  const { roomNumberId } = req.params;
  const { dates } = req.body;

  try {
    await updateRoomAvailability(roomNumberId, dates);
    return res.status(StatusCodes.OK).json("Room status has been updated.");
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

export async function getRoomHandler(req: Request, res: Response) {
  const { roomId } = req.params;
  try {
    const room = await getRoomById(roomId);
    if (!room) {
      return res.status(StatusCodes.NOT_FOUND).send("room not found.");
    }
    return res.status(StatusCodes.OK).json(room);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function getAllRoomsHandler(req: Request, res: Response) {
  try {
    const rooms = await getAllRooms();
    if (!rooms) {
      return res.status(StatusCodes.NOT_FOUND).send("Rooms not found.");
    }
    return res.status(StatusCodes.OK).json(rooms);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
