import { LoadingOutlined } from "@ant-design/icons";
import { Fragment, ReactNode, useEffect, useState } from "react";

export type FetcherType<T> = Promise<
  | {
      data: T;
      error?: any;
    }
  | { error: any; data?: undefined }
>;

export interface SuraAsyncMaskComponentsProps<T> {
  fetcher: FetcherType<T>;
  query: Array<keyof T>;
  render?: (
    value: string,
    loading: boolean,
    arrayValue: string[]
  ) => ReactNode | JSX.Element;
}
export const SuraAsyncMaskComponents = <T extends unknown>({
  fetcher,
  query,
  render,
}: SuraAsyncMaskComponentsProps<T>) => {
  const [result, setResult] = useState<T>();
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await fetcher;
    setResult(res?.data);
    setLoading(false);
  }, [fetcher]);

  // @ts-ignore
  const genericKeyContent = Object?.keys(result ?? {})?.map?.((key) => key);
  const filterGenericKeyContent = genericKeyContent?.filter?.((key) =>
    //   @ts-ignore
    query?.includes?.(key)
  );
  const mapFilterGenericToValue = filterGenericKeyContent.map?.((key) => {
    // @ts-ignore
    return result?.[key];
  });

  const DefaultRender = (
    <div style={{ display: "flex" }}>
      {filterGenericKeyContent?.map?.((key, index) => {
        return (
          <div key={index}>
            {
              // @ts-ignore
              result[key]
            }
            <span style={{ marginRight: 5 }} />
          </div>
        );
      })}
    </div>
  );

  // @ts-ignore
  const valueAsString = mapFilterGenericToValue.join(" ");
  const OwnRender = (
    <div>
      {render?.(
        // @ts-ignore
        valueAsString,
        loading,
        mapFilterGenericToValue
      )}
    </div>
  );

  return (
    <Fragment>
      {render ? (
        <div>{OwnRender}</div>
      ) : (
        <div>{loading ? <LoadingOutlined /> : DefaultRender}</div>
      )}
    </Fragment>
  );
};
