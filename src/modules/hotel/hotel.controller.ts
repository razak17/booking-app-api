import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createHotelBody } from "./hotel.schema";
import {
  createHotel,
  deleteHotel,
  getHotels,
  getHotelById,
  getHotelCountByCity,
  getHotelCountByType,
  getHotelRooms,
  updateHotel,
} from "./hotel.service";

export const createHotelHandler = async (
  req: Request<{}, {}, createHotelBody>,
  res: Response
) => {
  try {
    const newHotel = await createHotel({ ...req.body });
    return res.status(StatusCodes.OK).json(newHotel);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const updateHotelHandler = async (req: Request, res: Response) => {
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

export async function getHotelsHandler(
  req: Request<{}, { min: number; max: number; limit: number }, {}>,
  res: Response
) {
  try {
    const hotels = await getHotels(req.query);
    if (!hotels) {
      return res.status(StatusCodes.NOT_FOUND).send("Hotels not found.");
    }
    return res.status(StatusCodes.OK).json(hotels);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

export async function hotelsCountByCityHandler(req: Request, res: Response) {
  const cities = req.query.cities as string;
  const cityTags = cities.split(",");

  try {
    const hotels = await getHotelCountByCity(cityTags);
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

export async function hotelRoomsHandler(req: Request, res: Response) {
  const { hotelId } = req.params;
  try {
    const hotelRooms = await getHotelRooms(hotelId);
    if (!hotelRooms) {
      return res.status(StatusCodes.NOT_FOUND).send("Hotel rooms not found.");
    }
    return res.status(StatusCodes.OK).json(hotelRooms);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
