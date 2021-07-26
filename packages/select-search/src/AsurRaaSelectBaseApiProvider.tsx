import { AxiosInstance, AxiosResponse } from "axios";
import { ReactNode } from "react";
import { createContext, useContext } from "react";

export interface AsurRaaSelectBaseApiContextInterface<Meta> {
  fetcher: AxiosInstance;
  uri: {
    page: string;
  };
  parseSearch: (searchValue?: string, keyToSearch?: string) => string;
  parseResponse: {
    data: (res: AxiosResponse) => [];
    meta: (res: AxiosResponse | string | any) => Meta;
  };
  metaTotalPage: (meta: Meta) => number;
  children?: ReactNode;
}

const AsurRaaSelectBaseApiContext = createContext<
  AsurRaaSelectBaseApiContextInterface<any> | undefined
>(undefined);

const AsurRaaSelectBaseApiProvider = <M extends unknown>(
  props: AsurRaaSelectBaseApiContextInterface<M>
) => {
  return (
    <AsurRaaSelectBaseApiContext.Provider
      value={{
        fetcher: props.fetcher,
        uri: props.uri,
        parseResponse: props.parseResponse,
        metaTotalPage: props.metaTotalPage,
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
