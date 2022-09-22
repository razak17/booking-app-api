import { boolean, number, object, string, TypeOf } from "zod";

export const createHotelSchema = {
  body: object({
    name: string({ required_error: "name is required" }),
    type: string({ required_error: "type is required" }),
    city: string({ required_error: "city is required" }),
    address: string({ required_error: "address is required" }),
    distance: string({ required_error: "distance is required" }),
    photos: string({ required_error: "distance is required" }).array(),
    title: string({ required_error: "title is required" }),
    desc: string({ required_error: "desc is required" }),
    rating: number({ required_error: "rating is required" }),
    cheapestPrice: number({ required_error: "cheapestPrice is required" }),
    rooms: string({ required_error: "distance is required" }).array(),
    featured: boolean({ required_error: "featured is required" })
  }),
};

export type createHotelBody = TypeOf<typeof createHotelSchema.body>;
