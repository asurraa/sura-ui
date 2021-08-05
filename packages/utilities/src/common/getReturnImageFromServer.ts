export const getReturnSingleImageFromServer = (uuid: string | undefined) => {
  const fullUrl = `${process.env.REACT_APP_IMAGE_PATH}${uuid}`;
  return fullUrl;
};
