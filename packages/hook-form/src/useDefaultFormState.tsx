// * closure hook return default value or not
export const useDefaultFormState = <T extends unknown>(value: T) => {
  return (keyValue: keyof T) => {
    if (value === undefined) {
      return "";
    } else {
      return value[keyValue];
    }
  };
};
