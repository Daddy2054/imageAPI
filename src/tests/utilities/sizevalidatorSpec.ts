import { sizeValidator } from '../../utilities/sizevalidator';

const incorrectSizeParamWidth1 = 'a'; //thumbnail width incorrect
const incorrectSizeParamWHeight1 = 'b'; //thumbnail height incorrect
const incorrectSizeParamWidth2 = '0'; //thumbnail width incorrect
const incorrectSizeParamWHeight2 = '0'; //thumbnail height incorrect
const incorrectSizeParamWidth3 = '500f'; //thumbnail width incorrect
const incorrectSizeParamWHeight3 = '600f'; //thumbnail height incorrect
const incorrectSizeParamWidth4 = '-100'; //thumbnail width incorrect
const incorrectSizeParamWHeight4 = '-200'; //thumbnail height incorrect

describe('Test for size parameters validation', function () {
  it('test for incorrect size parameter: "a","b"', function () {
    const response = sizeValidator(
      incorrectSizeParamWidth1,
      incorrectSizeParamWHeight1
    );
    expect(response).toBe(false);
  });
  it('test for incorrect size parameter: "0","0"', function () {
    const response = sizeValidator(
      incorrectSizeParamWidth2,
      incorrectSizeParamWHeight2
    );
    expect(response).toBe(false);
  });
  it('test for incorrect size parameter: "500f","600f"', function () {
    const response = sizeValidator(
      incorrectSizeParamWidth3,
      incorrectSizeParamWHeight3
    );
    expect(response).toBe(false);
  });
  it('test for incorrect size parameter: "-100","-200"', function () {
    const response = sizeValidator(
      incorrectSizeParamWidth4,
      incorrectSizeParamWHeight4
    );
    expect(response).toBe(false);
  });
});
