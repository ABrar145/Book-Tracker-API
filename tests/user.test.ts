import request from 'supertest';
import app from '../src/app';
import { db } from '../src/config/firebase';

let createdUserId = '';
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTc0NDA2NzU4MCwiZXhwIjoxNzQ0MDcxMTgwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mYnN2Y0Bib29rLXRyYWNlci5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWZic3ZjQGJvb2stdHJhY2VyLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoidGVzdC11c2VyLWlkIn0.Jm3n0gioz8xgkDLCXWgD75cuEk4HgqBqcChYr1_6eTKKlfzj-rYzTXSci7sXUbCYAQFjWmYaBlMFqT0_YICgAowpU_1O4MW3MU0WAn5AnJHJHgSjrc9VXayd2wIbNYpscSot3HbFv2mk--ob9yFqEHEvTjc8qU85zLY0fefdwQ_LlzdfjnFys8uxva0eqHQTxmaYdpeLu4NjvDUyAK6cGHf0Tk63S2aO9EReEuxV6WwUacpOLPHchkJFlN4WjAJtSkg3rONM5MXuyo09v_h22SZI01aB-VxHnlOL0iwYooL8ZJlLewWZeRNr91x2y9YYf2n4GBA7Yno8bvdCAPmR1g'; // replace with a valid token

describe('User API', () => {
  afterAll(async () => {
    if (createdUserId) {
      await db.collection('users').doc(createdUserId).delete();
    }
  });

  it('POST /api/v1/users - should create a user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        displayName: 'Test User',
        email: 'testuser@example.com',
        role: 'user'
      });

    expect(res.statusCode).toBe(201);
    createdUserId = res.body.id;
  });

  it('GET /api/v1/users/:id - should get user by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('testuser@example.com');
  });

  it('PUT /api/v1/users/:id - should update user', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ displayName: 'Updated User' });

    expect(res.statusCode).toBe(200);
    expect(res.body.displayName).toBe('Updated User');
  });

  it('DELETE /api/v1/users/:id - should delete user', async () => {
    const res = await request(app)
      .delete(`/api/v1/users/${createdUserId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
