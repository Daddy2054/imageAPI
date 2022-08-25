import app from '../../../index';
import supertest from 'supertest';

const request = supertest(app);
describe('Test endpoint responses /api/images', () => {
  it('gets the api/images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });

  it('test for missing parameters', async () => {
    const missingParam = '?filename=sammy.png';
    const response = await request.get('/api/images/' + missingParam);
    expect(response.status).toBe(400);
  });
});

describe('Test for image processing', () => {
  const imageFile = 'sammy.png'; //image file
  const notImageFile = 'package.json'; //not image file
  const notExistingFile = '12345.jpg'; //not existing file
  const sizeParam = '&width=100&height=100'; //thumbnail size

  it('test for correct imagefile processing', async () => {
    const response = await request.get(
      '/api/images/' + `?filename=${imageFile}${sizeParam}`
    );
    expect(response.status).toBe(200);
  });

  it('test for not image processing error', async () => {
    const response = await request.get(
      '/api/images/' + `?filename=${notImageFile}${sizeParam}`
    );
    expect(response.status).toBe(400);
  });

  it('test for not existing file processing error', async () => {
    const response = await request.get(
      '/api/images/' + `?filename=${notExistingFile}${sizeParam}`
    );
    expect(response.status).toBe(400);
  });
});
