import { AxiosInstance, AxiosResponse } from "axios";
import { createContext, FC, useContext } from "react";
import { AsurRaaSelectSearchBaserApiMetaInterface } from "./AsurRaaSelectBaseApi";

export interface AsurRaaSelectBaseApiContextInterface {
  fetcher: AxiosInstance;
  uri: {
    page: string;
  };
  parseSearch: (searchValue?: string, keyToSearch?: string) => string;
  parseResponse: {
    data: (res: AxiosResponse) => [];
    meta: (
      res: AxiosResponse | string | any
    ) => AsurRaaSelectSearchBaserApiMetaInterface;
  };
}

const AsurRaaSelectBaseApiContext = createContext<
  AsurRaaSelectBaseApiContextInterface | undefined
>(undefined);

const AsurRaaSelectBaseApiProvider: FC<
  AsurRaaSelectBaseApiContextInterface | undefined
> = (props) => {
  return (
    <AsurRaaSelectBaseApiContext.Provider
      value={{
        fetcher: props.fetcher,
        uri: props.uri,
        parseResponse: props.parseResponse,
        parseSearch: props.parseSearch,
      }}
    >
      {props.children}
    </AsurRaaSelectBaseApiContext.Provider>
  );
};

// * hook
const useGetConfigAsuRaaSelectBaseApi = () => {
  return useContext(AsurRaaSelectBaseApiContext);
};

export {
  AsurRaaSelectBaseApiContext,
  AsurRaaSelectBaseApiProvider,
  useGetConfigAsuRaaSelectBaseApi,
};
