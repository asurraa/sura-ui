// **
// * Generate Enumeration to Array.
// **
interface getFindReturnSingleArrayObjInterface {
  id: number;
  data: Array<any>;
}
export const getFindReturnSingleArrayObj = ({
  data,
  id,
}: getFindReturnSingleArrayObjInterface) => {
  return data.find((data) => data.id === id);
};
