import { HotelModel } from "../hotel/hotel.model";
import { Room, RoomModel } from "./room.model";

export const createRoom = async (room: Room, hotelId: string) => {
  const savedRoom = RoomModel.create(room);
      return await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });

};

export async function updateRoom(
  roomId: string,
  update: object,
  options: object
) {
  return RoomModel.findByIdAndUpdate(roomId, { $set: update }, options);
}

export async function updateRoomAvailability(
  roomId: string,
  dates: Date[],
) {
    const updatedRoom = await RoomModel.updateOne(
      { "roomNumbers._id": roomId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": dates
        },
      }
    );
  return updatedRoom;
}

export async function deleteRoom(HotelId: string) {
  return RoomModel.findByIdAndDelete(HotelId);
}

export async function getRoomById(HotelId: string) {
  return RoomModel.findById(HotelId);
}

export async function getAllRooms() {
  return RoomModel.find();
}

