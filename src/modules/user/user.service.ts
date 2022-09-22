import { User, UserModel } from "./user.model";
import argon2 from "argon2";

export async function createUser(user: Omit<User, | "country" | "city" | "img" | "phone">) {
  const hash = await argon2.hash(user.password);
  const newUser = new UserModel({ ...user, password: hash });
  return await newUser.save();
}

export async function findUserByEmail(email: User["email"]) {
  return await UserModel.findOne({ email });
}

export async function updateUser(
  userId: string,
  update: object,
  options: object
) {
  return await UserModel.findByIdAndUpdate(userId, { $set: update }, options);
}

export async function deleteUser(userId: string) {
  return await UserModel.findByIdAndDelete(userId);
}

export async function getUserById(userId: string) {
  return await UserModel.findById(userId);
}

export async function getAllUsers() {
  return await UserModel.find();
}
