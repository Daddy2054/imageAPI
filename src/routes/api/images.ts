import express, { NextFunction, Request, Response } from 'express';
import resizer from '../../utilities/resizer';
import { sizeValidator } from '../../utilities/sizevalidator';
import { existsSync } from 'node:fs';
import path from 'node:path';

const images = express.Router();
const assetsPath = 'assets/full/';
const thumbnailsRoot = 'assets/thumbnails/';

const paramCheck = (req: Request, res: Response, next: NextFunction): void => {
  let errMsg = '';
  let errStatus = 500;
  if (
    req.query.filename == undefined &&
    req.query.width == undefined &&
    req.query.height == undefined
  ) {
    errStatus = 200;
    errMsg =
      'welcome to image resizer! please,provide parameters: "?filename="file name"&width="width in px"&height="height in px"';
  }
  if (
    req.query.filename == undefined ||
    req.query.width == undefined ||
    req.query.height == undefined
  ) {
    if (errMsg === '') {
      errStatus = 400;
      errMsg =
        'wrong parametes! Please use: "?filename="file name"&width="width in px"&height="height in px"';
    }
  }
  if (!sizeValidator(req.query.width as string, req.query.height as string)) {
    if (errMsg === '') {
      errStatus = 400;
      errMsg = 'wrong parametes! Please use only numbers for image size';
    }
  }
  if (!existsSync(assetsPath + req.query.filename)) {
    if (errMsg === '') {
      errStatus = 400;
      errMsg = `wrong filename! ${
        assetsPath + req.query.filename
      } do not exists!`;
    }
  }
  if (errMsg === '') {
    next();
  } else {
    res.status(errStatus).send(errMsg);
  }
};

async function sendThumbBack(req: Request, res: Response, next: NextFunction) {
  const thumbnailsPath = (thumbnailsRoot +
    req.query.width +
    'X' +
    req.query.height +
    '/') as string;

  const absPath = path.resolve(
    thumbnailsPath,
    req.query.filename as string
  ) as string;

  const params = {
    inputFilename: req.query.filename as string,
    width: req.query.width as string,
    height: req.query.height as string
  };
  await resizer(params);
  if (existsSync((thumbnailsPath + req.query.filename) as string)) {
    res.sendFile(absPath, function (err: Error) {
      if (err) {
        console.error(err.stack);
      } else {
        next();
      }
    });
  }
}

void images.use(paramCheck);

void images.use(sendThumbBack);
images.get('/', (req: Request, res: Response, next: NextFunction): void => {
  next();
});

export default images;
