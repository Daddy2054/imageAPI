const express = require('express');
import { access, constants } from 'node:fs';

const app = express();
const port = 3000;
const tumbFile =
  '/home/jean/Documents/udacity/fjnp/imageAPI/assets/tumbnails/sammy.png';

app.get('/', (req, res) => {
  res.sendFile(
    '/home/jean/Documents/udacity/fjnp/imageAPI/assets/tumbnails/sammy.png'
  );
  access(tumbFile, constants.F_OK, (err) => {
    if (err != undefined) {
      console.log('file did not exists, resizer!');
    }
  });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
