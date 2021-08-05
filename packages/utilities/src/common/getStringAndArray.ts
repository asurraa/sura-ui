// *
// * Generate array to string & string to array
// *

import voca from "voca";
// * Convert Array to string

export const getParseArrayToString = (value: string[]): string => {
  return value + "";
};

// * Convert String to Array
export const getParseStringToArray = (value: string | undefined): string[] => {
  return voca.split(value, ",");
};
