// **
// * Check weather editable true or not.
// **

export const getCheckIsEditableDataNullFuc = (
  editableData: any | null | undefined
): boolean => {
  return editableData === null || editableData === undefined ? true : false;
};
