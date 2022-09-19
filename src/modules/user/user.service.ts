import { User, UserModel } from "./user.model";
import argon2 from "argon2";

export async function createUser(user: User) {
  const hash = await argon2.hash(user.password);
  const newUser = new UserModel({ ...user, password: hash });
  return await newUser.save();
}

export async function findUserByEmail(email: User["email"]) {
  return UserModel.findOne({ email });
}

export async function updateUser(
  userId: string,
  update: object,
  options: object
) {
  return UserModel.findByIdAndUpdate(userId, { $set: update }, options);
}

export async function deleteUser(userId: string) {
  return UserModel.findByIdAndDelete(userId);
}

export async function getUserById(userId: string) {
  return UserModel.findById(userId);
}

export async function getAllUsers() {
  return UserModel.find();
}
