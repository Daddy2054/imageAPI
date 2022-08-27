export const sizeValidator = function (str1: string, str2: string) {
  const pattern1 = /^0/; // match 0 at the start
  const pattern2 = /\D/; // match any non digit, including minus at the start

  if (
    pattern2.test(str1) ||
    pattern1.test(str1) ||
    pattern2.test(str2) ||
    pattern1.test(str2)
  ) {
    return false;
  }
  return true;
};
