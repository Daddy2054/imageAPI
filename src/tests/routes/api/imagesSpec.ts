import supertest from 'supertest';
import app from '../../../index';

import { existsSync, rmSync } from 'node:fs';

const request = supertest(app);

describe('Test endpoint responses /api/images', function () {
  it('gets the api/images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });
});

describe('Tests for parameters', function () {
  const existingFile = 'sammy.png'; //image file
  const notExistingFile = '12345.jpg'; //not existing file
  const sizeParamWidth = '100'; //thumbnail width
  const sizeParamWHeight = '100'; //thumbnail height
  const sizeParam = `&width=${sizeParamWidth}&height=${sizeParamWHeight}`;
  const missingParam1 = '?width=100&height=100';
  const missingParam2 = `?filename=${existingFile}&height=${sizeParamWHeight}`;
  const missingParam3 = `?filename=${existingFile}&width=${sizeParamWidth}`;

  it('test for missing parameter 1', async () => {
    const response = await request.get('/api/images/' + missingParam1);
    expect(response.status).toBe(400);
  });
  it('test for missing parameter 2', async () => {
    const response = await request.get('/api/images/' + missingParam2);
    expect(response.status).toBe(400);
  });
  it('test for missing parameter 3', async () => {
    const response = await request.get('/api/images/' + missingParam3);
    expect(response.status).toBe(400);
  });
  it('test for not existing file', async () => {
    const response = await request.get(
      '/api/images/' + `?filename=${notExistingFile}${sizeParam}`
    );
    expect(response.status).toBe(400);
  });
});
