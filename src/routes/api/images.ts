import express from 'express';
import { resizer } from '../../utilities/resizer';

const images = express.Router();
const assetsPath = 'assets/full';
const tumbnailsPath = 'assets/tumbnails';

images.get('/', (req, res, next) => {
  if (
    req.query.filename != undefined &&
    req.query.width != undefined &&
    req.query.height != undefined
  ) {
    resizer(
      assetsPath as string,
      tumbnailsPath as string,
      req.query.filename as string,
      req.query.width as string,
      req.query.height as string
    );
  } else {
    res.send(
      'wrong parameters! "?filename="file name"&width="width in px"heigth="heigth in px"'
    );
  }
  next();
});

export default images;
