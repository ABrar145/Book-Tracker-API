import request from 'supertest';
import app from '../src/app';
import { db } from '../src/config/firebase';

let createdBookId = '';
const testBook = {
  title: 'The Book of Tests',
  author: 'Tester McTestface',
  status: 'reading',
  notes: 'Testing in progress...'
};

describe(' Book API', () => {
  afterAll(async () => {
    if (createdBookId) {
      await db.collection('books').doc(createdBookId).delete();
    }
  });

  it('POST /api/books - should create a book', async () => {
    const res = await request(app).post('/api/books').send(testBook);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(testBook.title);
    createdBookId = res.body.id;
  });

  it('GET /api/books - should return all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/books/:id - should return specific book', async () => {
    const res = await request(app).get(`/api/books/${createdBookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testBook.title);
  });

  it('PUT /api/books/:id - should update book', async () => {
    const res = await request(app).put(`/api/books/${createdBookId}`).send({
      status: 'read',
      notes: 'Done testing'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('read');
    expect(res.body.notes).toBe('Done testing');
  });

  it('DELETE /api/books/:id - should delete book', async () => {
    const res = await request(app).delete(`/api/books/${createdBookId}`);
    expect(res.statusCode).toBe(204);
  });
});
