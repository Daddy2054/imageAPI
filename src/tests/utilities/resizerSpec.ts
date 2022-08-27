import resizer from '../../utilities/resizer';
import { existsSync, rmSync } from 'node:fs';
describe('Test for image processing.', function () {
  const imageFile = 'sammy.png'; //image file
  const thumbnailsRoot = 'assets/thumbnails/';
  const sizeParamWidth = '100'; //thumbnail width
  const sizeParamWHeight = '100'; //thumbnail height
  const thumbnailsPath = (thumbnailsRoot +
    sizeParamWidth +
    'X' +
    sizeParamWHeight +
    '/') as string;

  const params = {
    inputFilename: imageFile as string,
    width: sizeParamWidth as string,
    height: sizeParamWHeight as string
  };

  it('test for correct imagefile processing', async () => {
    if (existsSync(thumbnailsPath + imageFile)) {
      rmSync(thumbnailsPath + imageFile);
    }
    await resizer(params);
    expect(existsSync(thumbnailsPath + imageFile)).toBeTrue();
  });
});
