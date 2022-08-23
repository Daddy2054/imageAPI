import express from 'express';
//import { resizer } from '../../utilities/resizer';
import sharp from 'sharp';
import { constants, access } from 'node:fs';
import path from 'node:path';
import { doesNotMatch } from 'node:assert';

const images = express.Router();
const assetsPath = 'assets/full/';
const tumbnailsPath = 'assets/tumbnails/';

const sendThumbBack = function (req: any, res: any, next: any) {
  const filename = req.query.filename as string;
  const absPath = path.resolve(tumbnailsPath, filename);
  res.sendFile(absPath, function (err: any) {
    if (err) {
      console.error(err.stack);
      //res.status(500).send('Something broke!');
      //    next();
    } else {
      console.log('Sent:' + filename);
    }
  });
  next();
};

const paramCheck = (req: any, res: any, next: any) => {
  if (
    req.query.filename == undefined ||
    req.query.width == undefined ||
    req.query.height == undefined
  ) {
    res
      .status(400)
      .send(
        'wrong parameters! "?filename="file name"&width="width in px"heigth="heigth in px"'
      );
  }
  next();
};

async function resizer(req: any, res: any, next: any) {
  // Check if the file exists in the current directory.

  access(tumbnailsPath + req.query.filename, constants.F_OK, (err) => {
    if (!err) {
      next();
    }
  });
  try {
    await sharp(assetsPath + req.query.filename)
      .resize({
        width: parseInt(req.query.width),
        height: parseInt(req.query.height)
      })
      .toFile(tumbnailsPath + req.query.filename);
    next();
  } catch (error) {
    console.log('resizer error:' + error);
  }
}
images.use(paramCheck);
images.use(resizer);
images.use(sendThumbBack);

images.get('/', (req, res, next) => {
  //next();
});
export default images;
