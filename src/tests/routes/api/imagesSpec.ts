import app from '../../../index';
// import images from '../../../../src/routes/api/images';
import supertest from 'supertest';
import { Response } from 'express';

const request = supertest(app);
describe('Test endpoint responses /api/images', () => {
    it('gets the api/images endpoint', async (done) => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
        done();
    }
)
it('gets the api/images and missing parameters', async (done) => {
    const missingParam = '?filename=sammy.png'
    const response = await request
    .get('/api/images'+missingParam)

    expect(response.status).toBe(400);
    done();
})


/*
check image processing:
1.
check that thumbnail file do not exist
get parameters
check that thumbnail file exist 

2. error: get parameters with wrong format
check error


check send image:
get right params 
check response with content type image and status 200

*/
});