import { Hotel, HotelModel } from "./hotel.model";

export const createHotel = (hotel: Hotel) => {
  return HotelModel.create(hotel);
};

export async function updateHotel(
  HotelId: string,
  update: object,
  options: object
) {
  return HotelModel.findByIdAndUpdate(HotelId, { $set: update }, options);
}

export async function deleteHotel(HotelId: string) {
  return HotelModel.findByIdAndDelete(HotelId);
}

export async function getHotelById(HotelId: string) {
  return HotelModel.findById(HotelId);
}

export async function getAllHotels() {
  return HotelModel.find();
}

export async function getHotelCountByCity(cities: string) {
  const params = cities.split(",");

    const list = await Promise.all(
      params.map((city) => {
        return HotelModel.countDocuments({ city: city });
      })
    );

  return list;
}
