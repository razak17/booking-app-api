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

export async function updateRoomAvailability(roomId: string, dates: Date[]) {
  const updatedRoom = await RoomModel.updateOne(
    { "roomNumbers._id": roomId },
    {
      $push: {
        "roomNumbers.$.unavailableDates": dates,
      },
    }
  );
  return updatedRoom;
}

export async function deleteRoom(roomId: string, hotelId: string) {
  await RoomModel.findByIdAndDelete(roomId);
  return await HotelModel.findByIdAndUpdate(hotelId, {
    $pull: { rooms: roomId },
  });
}

export async function getRoomById(roomId: string) {
  return RoomModel.findById(roomId);
}

export async function getAllRooms() {
  return RoomModel.find();
}
