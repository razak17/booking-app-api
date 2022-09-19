import { object, string, TypeOf } from "zod";

export const updateUserSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    username: string({
      required_error: "username is required",
    }),
  }),
  params: object({
    userId: string(),
  }),
};
export type UpdateUserBody = TypeOf<typeof updateUserSchema.body>;
export type UpdateUserParams = TypeOf<typeof updateUserSchema.params>;
