import request from 'supertest';
import app from '../src/app';

let createdReviewId = '';
const mockReview = {
  bookId: 'test-book-id', // Replace with a real bookId from your DB
  rating: 4,
  comment: 'Great book!'
};

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTc0NDA2NzU4MCwiZXhwIjoxNzQ0MDcxMTgwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mYnN2Y0Bib29rLXRyYWNlci5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWZic3ZjQGJvb2stdHJhY2VyLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoidGVzdC11c2VyLWlkIn0.Jm3n0gioz8xgkDLCXWgD75cuEk4HgqBqcChYr1_6eTKKlfzj-rYzTXSci7sXUbCYAQFjWmYaBlMFqT0_YICgAowpU_1O4MW3MU0WAn5AnJHJHgSjrc9VXayd2wIbNYpscSot3HbFv2mk--ob9yFqEHEvTjc8qU85zLY0fefdwQ_LlzdfjnFys8uxva0eqHQTxmaYdpeLu4NjvDUyAK6cGHf0Tk63S2aO9EReEuxV6WwUacpOLPHchkJFlN4WjAJtSkg3rONM5MXuyo09v_h22SZI01aB-VxHnlOL0iwYooL8ZJlLewWZeRNr91x2y9YYf2n4GBA7Yno8bvdCAPmR1g'; // replace with a valid token

describe('Review API', () => {
  it('POST /api/v1/reviews - should create review', async () => {
    const res = await request(app)
      .post('/api/v1/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(mockReview);

    expect(res.statusCode).toBe(201);
    createdReviewId = res.body.id;
  });

  it('GET /api/v1/reviews/:id - should get review by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/reviews/${createdReviewId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(4);
  });

  it('PUT /api/v1/reviews/:id - should update review', async () => {
    const res = await request(app)
      .put(`/api/v1/reviews/${createdReviewId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ rating: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(5);
  });

  it('GET /api/v1/reviews - should return reviews list', async () => {
    const res = await request(app)
      .get('/api/v1/reviews')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it('DELETE /api/v1/reviews/:id - should delete review', async () => {
    const res = await request(app)
      .delete(`/api/v1/reviews/${createdReviewId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
