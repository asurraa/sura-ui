import { HttpRequestHeader } from "antd/lib/upload/interface";
import { createContext, FC, useContext } from "react";

interface AsurRaaUploadContextType {
  postUrl: string;
  returnImagePath: string | undefined;
  header: HttpRequestHeader;
}

const AsurRaaUploadContext = createContext<
  AsurRaaUploadContextType | undefined
>(undefined);

const AsurRaaUploadProvider: FC<AsurRaaUploadContextType> = (props) => {
  return (
    <AsurRaaUploadContext.Provider
      value={{
        header: props.header,
        postUrl: props.postUrl,
        returnImagePath: props.returnImagePath,
      }}
    >
      {props.children}
    </AsurRaaUploadContext.Provider>
  );
};

const useGetProviderAsurRaaUpload = () => {
  return useContext(AsurRaaUploadContext);
};

export {
  AsurRaaUploadProvider,
  AsurRaaUploadContext,
  useGetProviderAsurRaaUpload,
};
