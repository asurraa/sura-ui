// **
// * Check Weather Developments is Production or developments.
// **

export const getFixNumberSeparateFunc = (
  value: number,
  decimal_part: number
) => {
  return (
    Math.round(value * Math.pow(10, decimal_part)) / Math.pow(10, decimal_part)
  )
    ?.toFixed(decimal_part)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
