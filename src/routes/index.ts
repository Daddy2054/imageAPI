import express, { Request, Response } from 'express';

import images from './api/images';

const routes = express.Router();

void routes.get('/', (req: Request, res: Response) => {
  res.send('main api route');
});

void routes.use('/images', images);

export default routes;
