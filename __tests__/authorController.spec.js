const app = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Author Routes', () => {

    test('Get an author', async() =>{
        const _author = {
            "_id": "671c601a78fadd47df20166d",
            "name": "George R.R. Martin",
            "birthday": "1948-09-20"
        }
        const res = await request.get('/author');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(204)
    })
})
