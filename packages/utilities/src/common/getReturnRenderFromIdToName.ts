export const getReturnRenderFromIdToName = (props: {
  idThatGetFrom: number;
  originData: Array<any>;
}) => {
  return props?.originData?.find((data) => data?.id === props?.idThatGetFrom);
};
