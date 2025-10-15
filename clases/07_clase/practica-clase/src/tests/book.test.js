import dotenv from 'dotenv'
import request from 'supertest';
import { sequelize } from '../databases/sequelize.mysql.cnx.js';
import mongooseConnectionInstance from '../databases/mongoose.cnx.js';

import mongoose from "mongoose"
import app from '../app.js';


dotenv.config()

beforeAll(async () => {
    // await sequelize.sync({ force: false });
    await mongooseConnectionInstance.connect();

});

afterAll(async () => {
    // await sequelize.close();
    await mongoose.disconnect();

});




// describe('📚 Book API endpoints', () => {
//     let createdBook;

//     test('POST /books → create a new book', async () => {
//         const response = await request(app).post('/api/book/').send({
//             title: '1984',
//             author: 'George Orwell'
//         });

//         expect(response.statusCode).toBe(201);
//         expect(response.body).toHaveProperty('id');
//         expect(response.body.title).toBe('1984');

//         createdBook = response.body;
//     });

//     test('GET /books → get all books', async () => {
//         const response = await request(app).get('/api/book/');
//         expect(response.statusCode).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//         expect(response.body.length).toBeGreaterThan(0);
//     });

//     test('GET /books/:id → get book by id', async () => {
//         const response = await request(app).get(`/api/book/${createdBook.id}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body.title).toBe('1984');
//     });

//     test('PUT /books/:id → update a book', async () => {
//         const response = await request(app).put(`/api/book/${createdBook.id}`).send({
//             author: 'G. Orwell'
//         });
//         expect(response.statusCode).toBe(200);
//         expect(response.body.author).toBe('G. Orwell');
//     });

//     test('DELETE /books/:id → delete a book', async () => {
//         const response = await request(app).delete(`/api/book/${createdBook.id}`);
//         expect(response.statusCode).toBe(204);
//     });

//     test('GET /books/:id → book not found', async () => {
//         const response = await request(app).get(`/api/book/${createdBook.id}`);
//         expect(response.statusCode).toBe(404);
//     });
// });



describe('📚 Book API endpoints (Mongoose)', () => {
    let createdBook;

    test('POST /api/book → create a new book', async () => {
        const response = await request(app).post('/api/book').send({
            title: '1984',
            author: 'George Orwell'
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe('1984');

        createdBook = response.body;
    });

    test('GET /api/book → get all books', async () => {
        const response = await request(app).get('/api/book');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /api/book/:id → get book by id', async () => {
        const response = await request(app).get(`/api/book/${createdBook._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('1984');
    });

    test('PUT /api/book/:id → update a book', async () => {
        const response = await request(app).put(`/api/book/${createdBook._id}`).send({
            author: 'G. Orwell'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.author).toBe('G. Orwell');
    });

    test('DELETE /api/book/:id → delete a book', async () => {
        const response = await request(app).delete(`/api/book/${createdBook._id}`);
        expect(response.statusCode).toBe(204);
    });

    test('GET /api/book/:id → book not found', async () => {
        const response = await request(app).get(`/api/book/${createdBook._id}`);
        expect(response.statusCode).toBe(404);
    });
});