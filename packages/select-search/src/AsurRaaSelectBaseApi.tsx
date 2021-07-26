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

export interface AsurRaaSelectSearchBaserApiMetaInterface {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
export interface AsurRaaSelectSearchBaseApiProps<T> extends SelectProps<any> {
  uriData: string;
  onSelectExtend?: (value: T) => void;
  addButtonProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  showTriggerRefresh?: boolean;
  valueRender: Array<keyof T>;
  renderValueExtra?: (propsData: T) => ReactNode | string;
}

export const AsurRaaSelectSearchBaseApi = <T extends { id: number }>(
  props: AsurRaaSelectSearchBaseApiProps<T>
) => {
  const global = useGetConfigAsuRaaSelectBaseApi();
  const { t } = useTranslation();
  const [dataState, setDataState] = useState<Array<T>>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [meta, setMeta] = useState<AsurRaaSelectSearchBaserApiMetaInterface>({
    currentPage: 1,
    itemCount: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  });
  const pageParam = global?.uri.page;
  const searchParam = global?.uri.search;
  const searchParamInput =
    search === undefined ? "" : `&${searchParam}=${search}`;
  const baseUriRoute = `${props.uriData}?${pageParam}=${page}${searchParamInput}`;

  useEffect(() => {
    global?.fetcher.get(baseUriRoute).then((res: AxiosResponse<any>) => {
      const data = global?.parseResponse?.data(res);
      const meta = global?.parseResponse?.meta(res);

      setDataState(data);
      setMeta(meta);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetcher = () => {
    global?.fetcher.get(baseUriRoute).then((res: AxiosResponse<any>) => {
      const data = global?.parseResponse?.data(res);
      setDataState([...dataState, ...data]);
    });
  };

  const refreshFetcher = () => {
    global?.fetcher.get(baseUriRoute).then((res: AxiosResponse<any>) => {
      const data = global?.parseResponse?.data(res);
      setDataState([...data]);
    });
  };

  const onScroll = (event: any) => {
    const target = event.target;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight + 5 >= target.scrollHeight &&
      page <= meta?.totalPages
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
          style={{ width: "100%" }}
          onPopupScroll={onScroll}
          defaultActiveFirstOption={true}
          {...props}
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
