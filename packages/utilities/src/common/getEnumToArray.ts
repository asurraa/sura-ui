// **
// * Generate Enumeration to Array.
// **

export const getEnumToArrayFunc = (enumData: any): Array<any> => {
  //
  // ! see
  // ? https://stackoverflow.com/questions/43100718/typescript-enum-to-object-array
  // * This function will return enum to array also filter type number out
  //
  return Object.values(enumData).filter((value) => typeof value !== "number");
};

export const getEnumToArrayFuncGeneric = <T>(enumData: T): Array<T> => {
  //
  // ! see
  // ? https://stackoverflow.com/questions/43100718/typescript-enum-to-object-array
  // * This function will return enum to array also filter type number out
  //
  return Object.values(enumData).filter((value) => typeof value !== "number");
};
