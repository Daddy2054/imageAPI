//import { constants, access } from 'node:fs';
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const node_fs = require('node:fs');
const node_path_1 = __importDefault(require('node:path'));

const filename =
  '/home/jean/Documents/udacity/fjnp/imageAPI/assets/tumbnails/sammy.png';
const tumbnailsPath = 'assets/tumbnails/';
const file = 'sammy.png';
node_fs.access(filename, node_fs.constants.F_OK, (err) => {
  if (err) {
    console.log(`${filename}  does not exist `);
  } else {
    console.log(`${filename}  exists`);
  }
});
const express = require('express');
//import routes from './routes/index';
//import routes from './routes');

const app = express();
const port = 3000;

//app.use('/api', routes);
app.get('/', (req, res, next) => {
  console.log('filkename:' + node_path_1.default.resolve(tumbnailsPath, file));
  res.sendFile(
    node_path_1.default.resolve(tumbnailsPath, file),
    function (err) {
      if (err) {
        //        next(err);
        console.error(err.stack);
        res.status(500).send('Something broke!');
      } else {
        console.log('Sent:' + filename);
      }
    }
  );
});
// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
