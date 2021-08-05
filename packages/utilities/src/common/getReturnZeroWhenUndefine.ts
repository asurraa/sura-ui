// *
// * Generate 0 when data is undefine
// *

export const getReturnZeroWhenUndefine = (data: number | undefined) => {
  if (data === undefined) {
    return 0;
  } else {
    return data;
  }
};
