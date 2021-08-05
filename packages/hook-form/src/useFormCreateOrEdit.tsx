// * closure hook to check whether need to use create or edit
export const useFormCreateOrEdit = <T extends unknown>(value: T) => {
  return (create: (data: T) => void, edit: (data: T) => void) => {
    if (value === undefined) {
      return create;
    } else {
      return edit;
    }
  };
};
