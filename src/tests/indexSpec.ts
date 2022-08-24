import app from '../index';

import supertest from 'supertest';


const request = supertest(app);
describe('Test endpoint responses /api', () => {
    it('gets the api endpoint', async (done) => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        done();
    }
)});
//const numArr = [3, 4, 5, 6];
//const wordArr = ['cat', 'dog', 'rabbit', 'bird'];
/*
xit('should make a new array containing dog', () => {
    expect(newArr(3, wordArr)).toContain('dog');
});
xit('make a new array containing 3', () => {
    expect(newArr(3, wordArr)).toContain(3);
});

*/






