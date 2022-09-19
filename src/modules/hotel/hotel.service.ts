import { Hotel, HotelModel } from "./hotel.model"

export const createHotel = (hotel: Hotel) => {
  return HotelModel.create(hotel);
}
