export const getGenerateLoopNumberOutArray = (floor: number): Array<number> => {
  // eslint-disable-next-line prefer-const
  let arr = [];
  for (let i = 1; i <= floor; i++) {
    arr.push(i);
  }
  return arr;
};
