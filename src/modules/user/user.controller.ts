import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UpdateUserBody, UpdateUserParams } from "./user.schema";
import { deleteUser, getUserById, updateUser } from "./user.service";

export const updateUserHandler = async (
  req: Request<UpdateUserParams, {}, UpdateUserBody>,
  res: Response
) => {
  const { userId } = req.params;

  if (userId !== res.locals.user._id) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
  }

  try {
    const updatedUser = await updateUser(
      userId,
      { ...req.body },
      { new: true }
    );

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (userId !== res.locals.user._id) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized.");
  }

  try {
    await deleteUser(userId);
    return res.status(StatusCodes.OK).send("User deleted.");
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
};

export async function getUserHandler(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send("User not found.");
    }

    const {password, ...rest} = user;
    return res.status(StatusCodes.OK).send(rest);
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

