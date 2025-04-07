import { Request, Response } from 'express';
import { db } from '../../config/firebase';
import { User } from '../models/user.model';

const usersCollection = db.collection('users');

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const docRef = await usersCollection.add({
      ...user,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({ id: docRef.id, ...user });
  } catch (error: any) {
    console.error(' Firestore error:', error);
    res.status(500).json({
      message: 'Failed to create user',
      error: error.message || String(error)
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const doc = await usersCollection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: 'User not found' });

    res.json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    console.error('getUserById error:', error);
    res.status(500).json({ message: 'Failed to get user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await usersCollection.doc(userId).update(req.body);
    const updatedDoc = await usersCollection.doc(userId).get();
    res.json({ id: userId, ...updatedDoc.data() });
  } catch (error: any) {
    console.error(' updateUser error:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await usersCollection.doc(req.params.id).delete();
    res.status(204).send();
  } catch (error: any) {
    console.error('❌ deleteUser error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
