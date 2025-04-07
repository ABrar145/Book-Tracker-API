import request from 'supertest';
import app from '../src/app';
import { db } from '../src/config/firebase';

let createdBookId = '';
const testBook = {
  title: 'Test Book',
  author: 'Test Author',
  status: 'unread',
  notes: 'Test notes'
};

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTc0NDA2NzU4MCwiZXhwIjoxNzQ0MDcxMTgwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mYnN2Y0Bib29rLXRyYWNlci5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWZic3ZjQGJvb2stdHJhY2VyLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoidGVzdC11c2VyLWlkIn0.Jm3n0gioz8xgkDLCXWgD75cuEk4HgqBqcChYr1_6eTKKlfzj-rYzTXSci7sXUbCYAQFjWmYaBlMFqT0_YICgAowpU_1O4MW3MU0WAn5AnJHJHgSjrc9VXayd2wIbNYpscSot3HbFv2mk--ob9yFqEHEvTjc8qU85zLY0fefdwQ_LlzdfjnFys8uxva0eqHQTxmaYdpeLu4NjvDUyAK6cGHf0Tk63S2aO9EReEuxV6WwUacpOLPHchkJFlN4WjAJtSkg3rONM5MXuyo09v_h22SZI01aB-VxHnlOL0iwYooL8ZJlLewWZeRNr91x2y9YYf2n4GBA7Yno8bvdCAPmR1g'; // replace with a valid token

describe('Book API', () => {
  it('POST /api/v1/books - should create a book', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${token}`)
      .send(testBook);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdBookId = res.body.id;
  });

  it('GET /api/v1/books - should return all books', async () => {
    const res = await request(app)
      .get('/api/v1/books')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/v1/books/:id - should return specific book', async () => {
    const res = await request(app)
      .get(`/api/v1/books/${createdBookId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testBook.title);
  });

  it('PUT /api/v1/books/:id - should update book', async () => {
    const res = await request(app)
      .put(`/api/v1/books/${createdBookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'read', notes: 'Done testing' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('read');
    expect(res.body.notes).toBe('Done testing');
  });

  it('DELETE /api/v1/books/:id - should delete book', async () => {
    const res = await request(app)
      .delete(`/api/v1/books/${createdBookId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(204);
  });
});
