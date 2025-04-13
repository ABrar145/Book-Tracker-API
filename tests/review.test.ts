import request from 'supertest';
import app from '../src/app';
import { db } from '../src/config/firebase';

let createdReviewId = '';
const mockReview = {
  bookId: 'test-book-id',
  userId: 'test-user-id',
  rating: 4,
  comment: 'Nice book!'
};

describe(' Review API', () => {
  afterAll(async () => {
    if (createdReviewId) {
      await db.collection('reviews').doc(createdReviewId).delete();
    }
  });

  it('POST /api/reviews - should create review', async () => {
    const res = await request(app).post('/api/reviews').send(mockReview);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdReviewId = res.body.id;
  });

  it('GET /api/reviews/:id - should get review by ID', async () => {
    const res = await request(app).get(`/api/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(4);
  });

  it('PUT /api/reviews/:id - should update review', async () => {
    const res = await request(app).put(`/api/reviews/${createdReviewId}`).send({ rating: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(5);
  });

  it('GET /api/reviews - should return reviews list', async () => {
    const res = await request(app).get('/api/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('DELETE /api/reviews/:id - should delete review', async () => {
    const res = await request(app).delete(`/api/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(204);
  });
});
