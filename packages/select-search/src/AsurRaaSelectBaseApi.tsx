/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable indent */
import {
  Loading3QuartersOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message, Select, SelectProps } from "antd";
import { AxiosResponse } from "axios";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import voca from "voca";
import { useGetConfigAsuRaaSelectBaseApi } from "./AsurRaaSelectBaseApiProvider";

export interface AsurRaaSelectSearchBaseApiProps<T> {
  uriData: string;
  searchAs?: Array<keyof T>;
  onSelectExtend?: (value: T) => void;
  addButtonProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  showTriggerRefresh?: boolean;
  valueRender: Array<keyof T>;
  renderValueExtra?: (propsData: T) => ReactNode | string;
  antdSelectProps?: SelectProps<any>;
}

export const AsurRaaSelectSearchBaseApi = <T extends { id: number | string }>(
  props: AsurRaaSelectSearchBaseApiProps<T>
) => {
  const context = useGetConfigAsuRaaSelectBaseApi();
  const { t } = useTranslation();
  const [dataState, setDataState] = useState<Array<T>>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const [meta, setMeta] = useState<unknown>();

  const searchParamGenerate = () => {
    let fullSearch = "&";
    if (props.searchAs === undefined) {
      fullSearch = context?.parseSearch(search)!;
    } else {
      props.searchAs?.forEach((keyToSearch) => {
        const inputParam = context?.parseSearch?.(
          search,
          keyToSearch.toString()
        );
        fullSearch = fullSearch + inputParam + "&";
      });
    }
    return voca.replaceAll(fullSearch, "undefined", "");
  };

  const pageParam = context?.uri.page;

  const baseUriRoute = `${
    props.uriData
  }?${pageParam}=${page}${searchParamGenerate()}`;

  useEffect(() => {
    context?.fetcher.get(baseUriRoute).then((res: AxiosResponse<any>) => {
      const data = context?.parseResponse?.data(res);
      const meta = context?.parseResponse?.meta(res);

      setDataState(data);
      setMeta(meta);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetcher = () => {
    context?.fetcher.get(baseUriRoute).then((res: AxiosResponse<any>) => {
      const data = context?.parseResponse?.data(res);
      setDataState([...dataState, ...data]);
    });
  };

  const refreshFetcher = () => {
    context?.fetcher.get(baseUriRoute).then((res: AxiosResponse<any>) => {
      const data = context?.parseResponse?.data(res);
      setDataState([...data]);
    });
  };

  const onScroll = (event: any) => {
    const target = event.target;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight + 5 >= target.scrollHeight &&
      // @ts-ignore
      page <= context?.metaTotalPage?.(meta)
    ) {
      setPage(page + 1);
      fetcher();
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Select
          placeholder={"Select or search"}
          filterOption={false}
          showSearch={true}
          onSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
          onPopupScroll={onScroll}
          defaultActiveFirstOption={true}
          {...props.antdSelectProps}
        >
          {loading ? (
            <LoadingOutlined />
          ) : (
            <Fragment>
              {dataState?.map((data, arrayIndex) => {
                const arrayTextRight = props?.valueRender?.map?.((value) => {
                  return dataState[arrayIndex][value];
                });
                const textRight = voca.replace(arrayTextRight + "", ",", " ");

                return (
                  <Select.Option value={data.id} key={arrayIndex}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{textRight}</div>
                      <div>
                        {props?.renderValueExtra?.(dataState[arrayIndex])}
                      </div>
                    </div>
                  </Select.Option>
                );
              })}
            </Fragment>
          )}
        </Select>
        {props.showTriggerRefresh === false ||
        props.showTriggerRefresh ? null : (
          <div
            onClick={() => {
              refreshFetcher();
              message.loading(t("loading"));
            }}
          >
            <RefreshListIcon style={{ cursor: "pointer" }} />
          </div>
        )}

        {props.addButtonProps === undefined ? null : (
          <div {...props.addButtonProps}>
            <AddListIcon style={{ cursor: "pointer" }} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

const RefreshListIcon = styled(Loading3QuartersOutlined)`
  margin-left: 10px;
  padding: 8px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top-left-radius: 2px !important;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
`;

const AddListIcon = styled(PlusOutlined)`
  margin-left: 10px;
  padding: 8px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top-left-radius: 2px !important;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
`;
