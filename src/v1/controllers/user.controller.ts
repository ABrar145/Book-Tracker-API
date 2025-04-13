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

import { db } from '../../config/firebase';
import { User } from '../models/user.model';

const usersCollection = db.collection('users');

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const docRef = await usersCollection.add({ ...user, createdAt: new Date().toISOString() });
    res.status(201).json({ id: docRef.id, ...user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const doc = await usersCollection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: 'User not found' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await usersCollection.doc(userId).update(req.body);
    const updated = await usersCollection.doc(userId).get();
    res.json({ id: userId, ...updated.data() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await usersCollection.doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }

};
