// **
// * Generate `key` To avoid the collisions so we consider to use timestamp.
// **

export const getGenerateColumnTableKey = () => {
  const time = new Date().getMilliseconds();
  const random = Math.random();
  const cal = time * random;
  return cal;
};
