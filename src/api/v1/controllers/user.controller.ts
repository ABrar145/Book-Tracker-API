import { Request, Response, NextFunction } from 'express';
import * as userService from "../services/user.service";
import { successResponse } from '../models/responseModel';

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await userService.getUsers();
  res.status(200).json(users);
  return;
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(successResponse(user, "User fetched"));
    return;
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
  return;
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const updated = await userService.updateUser(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json(updated);
  return;
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const deleted = await userService.deleteUser(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json({ message: "User deleted successfully" });
  return;
};

