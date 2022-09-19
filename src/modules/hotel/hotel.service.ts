import { RoomModel } from "../room/room.model";
import { Hotel, HotelModel } from "./hotel.model";

export const createHotel = async (hotel: Hotel) => {
  const { city, ...others } = hotel;
  const newHotel = new HotelModel({ ...others, city: city.toLowerCase() });
  return await newHotel.save();
};

export async function updateHotel(
  HotelId: string,
  update: object,
  options: object
) {
  return await HotelModel.findByIdAndUpdate(HotelId, { $set: update }, options);
}

export async function deleteHotel(HotelId: string) {
  return await HotelModel.findByIdAndDelete(HotelId);
}

export async function getHotelById(HotelId: string) {
  return await HotelModel.findById(HotelId);
}

export async function getAllHotels() {
  return await HotelModel.find();
}

export async function getHotelCountByCity(cities: string[]) {
  const list = await Promise.all(
    cities.map((city) => {
      return HotelModel.countDocuments({ city: city.toLowerCase() });
    })
  );

  return list;
}

export async function getHotelCountByType() {
  const hotelCount = await HotelModel.countDocuments({ type: "hotel" });
  const apartmentCount = await HotelModel.countDocuments({ type: "apartment" });
  const resortCount = await HotelModel.countDocuments({ type: "resort" });
  const villaCount = await HotelModel.countDocuments({ type: "villa" });
  const cabinCount = await HotelModel.countDocuments({ type: "cabin" });

  return [
    { type: "hotel", count: hotelCount },
    { type: "apartments", count: apartmentCount },
    { type: "resorts", count: resortCount },
    { type: "villas", count: villaCount },
    { type: "cabins", count: cabinCount },
  ];
}

export async function getHotelRooms(hotelId: string) {
    const hotel = await HotelModel.findById(hotelId);

  if (hotel) {
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomModel.findById(room);
      })
    );

  return list;
  }
}
