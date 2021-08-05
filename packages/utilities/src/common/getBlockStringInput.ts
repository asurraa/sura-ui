// * *
// *  Block 100% string in Input Number.
// * *

export const getBlockInvalidString = (e: any) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
