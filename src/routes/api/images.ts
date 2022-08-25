import express, { NextFunction, Request, Response } from 'express';

import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { error } from 'node:console';

const images = express.Router();
const assetsPath = 'assets/full/';
const tumbnailsPath = 'assets/tumbnails/';

const sendThumbBack = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //console.log('start sendThumbBack middleware');
  const filename = req.query.filename as string;
  const absPath = path.resolve(tumbnailsPath, filename);
  res.sendFile(absPath, function (err: Error) {
    if (err) {
      console.error(err.stack);
      //res.status(500).send('Something broke!');
      //    next();
    } else {
      //      console.log('Sent:' + filename);
      next();
    }
  });
  //next();
};

const paramCheck = (req: Request, res: Response, next: NextFunction) => {
  //  console.log('start paramCheck middleware');
  let errMsg = '';
  let errStatus = 500;
  if (
    req.query.filename == undefined &&
    req.query.width == undefined &&
    req.query.height == undefined
  ) {
    errStatus = 200;
    errMsg =
      'welcome to image resizer! please,provide parameters: "?filename="file name"&width="width in px"height="height in px"';

    next(error);
  }
  if (
    req.query.filename == undefined ||
    req.query.width == undefined ||
    req.query.height == undefined
  ) {
    if (errMsg === '') {
      errStatus = 400;
      errMsg =
        'wrong parametes! "?filename="file name"&width="width in px"height="height in px"';
    }

    next(error);
  }
  if (!existsSync(assetsPath + req.query.filename)) {
    if (errMsg === '') {
      errStatus = 400;
      errMsg = `wrong filename! ${
        assetsPath + req.query.filename
      } do not exists!`;
    }

    next(error);
  }
  if (errMsg === '') {
    next();
  } else {
    res.status(errStatus).send(errMsg);
  }
};

async function resizer(req: Request, res: Response, next: NextFunction) {
  //console.log('start resizer middleware');
  // Check if the file exists in the thumbnails directory.
  let errMsg = '';
  if (!existsSync(tumbnailsPath + req.query.filename)) {
    try {
      //  console.log('resize file' + req.query.filename);
      await sharp(assetsPath + req.query.filename)
        .resize({
          width: parseInt(req.query.width as string),
          height: parseInt(req.query.height as string)
        })
        .toFile(tumbnailsPath + req.query.filename);
    } catch (error) {
      errMsg = error as string;
      console.error('resizer error:' + errMsg.toString());
    }
  }
  if (errMsg !== '') {
    //res.status(400).send(error as unknown as string);
    res.status(400).send(errMsg.toString());
    next(error);
  } else {
    next();
  }
}

images.use(paramCheck);
images.use(resizer);
images.use(sendThumbBack);

images.get('/', (req: Request, res: Response, next: NextFunction) => {
  next();
});

export default images;
