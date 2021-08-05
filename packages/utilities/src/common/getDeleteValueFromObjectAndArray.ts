// **
// * Delete and exclude value from obj and array.
// **

export const getDeleteValueFromObject = <T extends Record<any, any>>(
  objData: T | undefined,
  remove: Array<keyof T[0] | any>
) => {
  const newObj = objData;
  remove?.map((value) => {
    delete newObj?.[value];
  });
  return {
    ...newObj,
  };
};

export const getDeleteValueFromArray = <T extends unknown>(
  arrayData: T[] | undefined,
  remove: Array<keyof T>
) => {
  const newArray = arrayData;
  remove.map((value) => {
    newArray?.map((data) => {
      const obj = data;
      delete obj[value];
      return obj;
    });
  });
  return newArray;
};
