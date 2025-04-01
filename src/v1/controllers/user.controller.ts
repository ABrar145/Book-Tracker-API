import { Request, Response } from 'express';

export const createUser = (req: Request, res: Response) => {
  const user = req.body;
  res.status(201).json({ id: 'user-id', ...user });
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, displayName: 'Test User', email: 'user@example.com' });
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  res.json({ id, ...update });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).send();
};
