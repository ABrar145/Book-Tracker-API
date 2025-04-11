import request from 'supertest';
import app from '../src/app'; // Adjust path if needed
import auth from '../src/config/firebase';
import mongoose from 'mongoose';

jest.mock('../src/config/firebase', () => ({
  __esModule: true,
  default: {
    verifyIdToken: jest.fn(),
  },
}));

const validToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTc0NDMyMjkxNCwiZXhwIjoxNzQ0MzI2NTE0LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1mYnN2Y0Bib29rLXRyYWNlci5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLWZic3ZjQGJvb2stdHJhY2VyLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoidGVzdC11c2VyLWlkIn0.F_5B2ds1Jq-FYdJ_0A2boJcEYxDEb7gT6H8fvMjHYwbeovk0Sp_TDv4UONIY6mq-Vn0O3GHBUh_DA-NL0Lcoo_qVwsu0NwRnk1vIf6R72FCh8pGWYmos3YooR5wwWfbnjk0PpFFB6bk6eRTNwnYyZDFwkqEsHmnmrOZjBxIBoge1CbeN4nUS2OFGzoRV0wHPAQmvj_Dx6OFC6tNlSPRJauDbtoKmErhNJ11OygVSfQVW3G6wqyunHTQUdb9UsSY-1UzjEc5zyXNFG-5QIf5JezIOvQm8bw9b2CE-UN1ker2FE-PWkPdmAy2CPYoOc56o7U72exVJl7gLzFr3D4sz4Q';

const authHeader = {
  Authorization: `Bearer ${validToken}`,
};

describe('Review API', () => {
  jest.setTimeout(15000); // Extend timeout to 15s

  beforeAll(() => {
    // Mock Firebase verifyIdToken
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({
      uid: 'test-user-id',
    });
  });

  let reviewId: string;
  let bookId: string;
  let userId: string;

  beforeAll(async () => {
    // Create book
    const bookRes = await request(app)
      .post('/api/v1/books')
      .set(authHeader)
      .send({
        title: 'The Test Book',
        author: 'Test Author',
        description: 'A book created for testing',
        publishedYear: 2024,
      });

    bookId = bookRes.body._id;

    // Create user
    const userRes = await request(app)
      .post('/api/v1/users')
      .set(authHeader)
      .send({
        uid: 'test-user-id',
        name: 'Test User',
        email: 'testuser@example.com',
      });

    userId = userRes.body._id;
  });

  it('should create a new review', async () => {
    const res = await request(app)
      .post('/api/v1/reviews')
      .set(authHeader)
      .send({
        book: bookId,
        user: userId,
        rating: 4,
        comment: 'A great test review!',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.rating).toBe(4);
    reviewId = res.body._id;
  });

  it('should fetch all reviews', async () => {
    const res = await request(app)
      .get('/api/v1/reviews')
      .set(authHeader);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a review by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/reviews/${reviewId}`)
      .set(authHeader);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', reviewId);
  });

  it('should update the review', async () => {
    const res = await request(app)
      .put(`/api/v1/reviews/${reviewId}`)
      .set(authHeader)
      .send({
        rating: 5,
        comment: 'Updated review text',
      });

    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(5);
  });

  it('should delete the review', async () => {
    const res = await request(app)
      .delete(`/api/v1/reviews/${reviewId}`)
      .set(authHeader);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Review deleted successfully');
  });

  it('should return 400 for invalid review ID', async () => {
    const res = await request(app)
      .get('/api/v1/reviews/invalid-id')
      .set(authHeader);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail validation for missing fields', async () => {
    const res = await request(app)
      .post('/api/v1/reviews')
      .set(authHeader)
      .send({
        comment: 'Missing rating, book, and user',
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
  });

  it('should fail authentication if no token', async () => {
    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
