import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';

async function resizer(params: {
  inputFilename: string;
  width: string;
  height: string;
}) {
  const inputFilename = params.inputFilename;
  const width = params.width;
  const height = params.height;
  const assetsPath = 'assets/full/';
  const thumbnailsRoot = 'assets/thumbnails/';
  const thumbnailsPath = (thumbnailsRoot +
    width +
    'X' +
    height +
    '/') as string;
  let errMsg = '';

  if (!existsSync(thumbnailsRoot)) {
    mkdirSync(thumbnailsRoot);
  }
  if (!existsSync(thumbnailsPath)) {
    mkdirSync(thumbnailsPath);
  }
  if (!existsSync(thumbnailsPath + inputFilename)) {
    // Check if the file exists in the thumbnails directory.
    try {
      await sharp(assetsPath + inputFilename)
        .resize({
          width: parseInt(width as string),
          height: parseInt(height as string)
        })
        .toFile(thumbnailsPath + inputFilename);
    } catch (error) {
      errMsg = error as string;
      console.error('resizer error:' + errMsg.toString());
    }
  }
}
export default resizer;
