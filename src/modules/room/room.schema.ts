import { date, number, object, string, TypeOf } from "zod";

export const createRoomSchema = {
  body: object({
    title: string({ required_error: "title is required" }),
    desc: string({ required_error: "desc is required" }),
    price: number({ required_error: "price is required" }),
    maxPeople: number({ required_error: "maxPeople is required" }),
    roomNumbers: object({
      number: number({ required_error: "number is required" }),
      unavailableDates: object({
        type: date({
          required_error: "unavailableDates type is required",
        }).array(),
      }),
    }).array(),
  }),
  params: object({
    hotelId: string(),
  }),
};
export type CreateRoomBody = TypeOf<typeof createRoomSchema.body>;
export type CreateRoomParams = TypeOf<typeof createRoomSchema.params>;
