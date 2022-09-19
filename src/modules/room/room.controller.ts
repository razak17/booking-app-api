import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateRoomBody, CreateRoomParams } from "./room.schema";
import { createRoom, updateRoom } from "./room.service";

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

export const deleteHotelHandler = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    await deleteHotel(hotelId);
    return res.status(StatusCodes.OK).send("Hotel has been deleted.");
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

export async function hotelsCountByCityHandler(req: Request, res: Response) {
  const cities = req.query.cities;

  try {
    const hotels = await getHotelCountByCity(cities as string);
    if (!hotels) {
      return res.status(StatusCodes.NOT_FOUND).send("Hotels not found.");
    }
    return res.status(StatusCodes.OK).json(hotels);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function hotelsCountByTypeHandler(req: Request, res: Response) {
  try {
    const hotels = await getHotelCountByType();
    if (!hotels) {
      return res.status(StatusCodes.NOT_FOUND).send("Hotels not found.");
    }
    return res.status(StatusCodes.OK).json(hotels);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

