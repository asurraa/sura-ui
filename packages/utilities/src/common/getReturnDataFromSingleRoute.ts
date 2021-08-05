import { AxiosHttp } from "@src/configs/axios_config";
import { REST_URI_ENUM } from "@src/constants/rest-uri.constant";
import { AxiosResponse } from "axios";

export const getReturnDataFromSingleRoute = async <T>(
  path: REST_URI_ENUM,
  id: number
) => {
  return (await AxiosHttp.get<AxiosResponse<T>>(`${path}/${id}`)).data;
};
