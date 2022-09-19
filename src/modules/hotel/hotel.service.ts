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
    ]
}
