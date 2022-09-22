import { HotelModel } from "../hotel/hotel.model";
import { Room, RoomModel } from "./room.model";

export const createRoom = async (room: Room, hotelId: string) => {
  const newRoom = await RoomModel.create(room);

  await HotelModel.findByIdAndUpdate(hotelId, {
    $addToSet: { rooms: newRoom._id.toString() },
  });

  return newRoom;
};

export async function updateRoom(
  roomId: string,
  update: object,
  options: object
) {
  return await RoomModel.findByIdAndUpdate(roomId, { $set: update }, options);
}

export async function updateRoomAvailability(roomNumberId: string, dates: Date[]) {
  const updatedRoom = await RoomModel.updateOne(
    { "roomNumbers._id": roomNumberId },
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
  await HotelModel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
  return;
}

export async function getRoomById(roomId: string) {
  return RoomModel.findById(roomId);
}

export async function getAllRooms() {
  return RoomModel.find();
}
