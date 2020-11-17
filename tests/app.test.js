const { TestScheduler } = require("jest");

import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/userService')

describe('app test suite', () => {
    test('my first test', async () => {
        console.log('my first test  console');
    });

    test('get all users test', async () => {
        console.log('my first test  console');
        let response = await request(app).get('/users');
         expect(response.statusCode).toBe(200);
         const resBody = response.body;
         expect(resBody.length).toBe(2);
    });
});