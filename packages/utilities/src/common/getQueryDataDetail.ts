// *
// * A utility that return full data as obj using search of.
// *

export const getQueryDataDetail = <T extends { id: number }>(
  id: number | undefined,
  dataToFind: Array<T>
): T | undefined => {
  return dataToFind?.find((dataToSearch) => dataToSearch.id === id);
};
