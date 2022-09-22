import mongoose from "mongoose";

export interface RoomInterface {
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
}

export interface Room extends RoomInterface, Pick<mongoose.Document, "_id" | "__v"> {
  createdAt: Date;
  updatedAt: Date;
}

export const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export const RoomModel = mongoose.model<Room>("Room", RoomSchema);
