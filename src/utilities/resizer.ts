import sharp from 'sharp';

export async function resizer(
  pathIn: string,
  pathOut: string,
  filename: string,
  widthStr: string,
  heightStr: string
) {
  try {
    const width = parseInt(widthStr);
    const height = parseInt(heightStr);
    await sharp(pathIn + filename)
      .resize({
        width: width,
        height: height
      })
      .toFile(pathOut + filename);
  } catch (error) {
    console.log('resizer error:' + error);
  }
}
