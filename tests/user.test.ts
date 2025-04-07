import request from 'supertest';
import app from '../src/app';
import { db } from '../src/config/firebase';

let createdUserId = '';

describe(' User API', () => {
  afterAll(async () => {
    if (createdUserId) {
      await db.collection('users').doc(createdUserId).delete();
    }
  });

  it('POST /api/users - should create a user', async () => {
    const res = await request(app).post('/api/users').send({
      displayName: 'Test User',
      email: 'testuser@example.com',
      role: 'user'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdUserId = res.body.id;
  });

  it('GET /api/users/:id - should get user by ID', async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('testuser@example.com');
  });

  it('PUT /api/users/:id - should update user', async () => {
    const res = await request(app).put(`/api/users/${createdUserId}`).send({
      displayName: 'Updated User'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.displayName).toBe('Updated User');
  });

  it('DELETE /api/users/:id - should delete user', async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`);
    expect(res.statusCode).toBe(204);
  });
});
