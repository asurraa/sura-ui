import { LoadingOutlined } from "@ant-design/icons";
import { Fragment, ReactNode, useEffect, useState } from "react";

export interface SuraAsyncMaskComponentsProps<T> {
  fetcherCache: { data: T };
  query: Array<keyof T>;
  render?: (
    value: string,
    loading: boolean,
    arrayValue: string[]
  ) => ReactNode | JSX.Element;
}

export const SuraAsyncMaskComponents = <T extends unknown>({
  query,
  render,
  fetcherCache,
}: SuraAsyncMaskComponentsProps<T>) => {
  const [result, setResult] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setResult(fetcherCache?.data);
    setLoading(false);
  }, [fetcherCache?.data]);

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
