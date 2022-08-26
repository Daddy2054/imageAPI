import supertest from 'supertest';
import app from '../../../index';

import { existsSync, rmSync } from 'node:fs';

const request = supertest(app);

describe('Test endpoint responses /api/images', function () {
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

describe('Test for errors when image processing.', function () {
  const imageFile = 'sammy.png'; //image file

  const notExistingFile = '12345.jpg'; //not existing file
  const sizeParamWidth = '100'; //thumbnail width
  const sizeParamWHeight = '100'; //thumbnail height
  const sizeParam = `&width=${sizeParamWidth}&height=${sizeParamWHeight}`;

  it('test for not existing file processing error', async () => {
    const response = await request.get(
      '/api/images/' + `?filename=${notExistingFile}${sizeParam}`
    );
    expect(response.status).toBe(400);
  });
});
