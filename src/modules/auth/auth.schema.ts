import { boolean, object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "password is required",
    })
      .min(6, "password must be at least 6 characters")
      .max(64, "password must not be longer than 64 charcters"),
  }),
};

export const registerSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    username: string({
      required_error: "username is required",
    }).min(2, "username must be at least 2 characters long"),
    password: string({
      required_error: "password is required",
    })
      .min(6, "password must be at least 6 characters long")
      .max(64, "password should not be longer than 64 characters"),
    confirmPassword: string({
      required_error: "password is required",
    })
      .min(6, "password must be at least 6 characters long")
      .max(64, "password should not be longer than 64 characters"),
    isAdmin: boolean({
      required_error: "isAdmin is required",
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  }),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;
export type RegisterUserBody = TypeOf<typeof registerSchema.body>;
