// *
// * Get remove white space from string.
// *

import voca from "voca";
export const getRemoveStringWhiteSpace = (value: string) => {
  const replace = voca.replaceAll(value, "_", "");
  const replaceWhiteSpace = replace.replace(/\s/g, "");
  return replaceWhiteSpace;
};
