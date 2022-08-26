import express from 'express';

import routes from './routes';

const app = express();
const port = 3000;

void app.use('/api', routes);

// start the Express server
void app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
export default app;
