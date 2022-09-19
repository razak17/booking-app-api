import { User, UserModel } from "./user.model";

export async function createUser(user: User) {
  return UserModel.create(user);
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
