import request from 'supertest';
import app from '../src/app';
import { db } from '../src/config/firebase';

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTc0NDE0MTg5OSwiZXhwIjoxNzQ0MTQ1NDk5LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mYnN2Y0Bib29rLXRyYWNlci5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWZic3ZjQGJvb2stdHJhY2VyLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoidGVzdC11c2VyLWlkIn0.fgVTYmYKaPoe2dvqzFCf-P5oLBJE9G7duoEKzS-8mU6Fng0AzPoz9ZSBnebEJQmXPNGLzFjwe30hAjIy14NI8l0xhrnrq0fqKPnwvUyT-bYB3H-7XnnQALTzG6J2dTtNS80Xb79Z_MbbuCTYCOufxJIvrpLsSMbPv97eOuf4CgFMG-f00t25khG4942o7jlhZoO0Zmsw9v7Wij2TGw6-GY6AuPlZlSYC3LNa9BR-79osW289vIPzjULGBFlOSaPoox337Iwz3XNgMMFqzs6MdbISqBPDTZglY_wrTRynI6zisvopUkiwfDVivKjdd1V13-KDRDE-GlUACxE7YYtcuw';

const userId = 'test-user-id';

let createdUserId = '';

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
