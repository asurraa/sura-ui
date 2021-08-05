// *
// * Generate 2 Precision for number
// *
export const getToFix2PrecisionAsNumberType = (value: number) => {
  return Math.round(value * 1e2) / 1e2;
};
