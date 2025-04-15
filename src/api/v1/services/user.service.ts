import userModel from "../models/user.model";

export const getUsers = async () => userModel.find();

export const getUserById = async (id: string) => userModel.findById(id);

export const createUser = async (data: any) => userModel.create(data);

export const updateUser = async (id: string, data: any) =>
  userModel.update(id, data);

export const deleteUser = async (id: string) => userModel.delete(id);
