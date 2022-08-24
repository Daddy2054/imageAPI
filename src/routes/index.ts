import express, { Request, Response } from 'express';

import images from './api/images';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('main api route');
});

routes.use('/images', images);

export default routes;
