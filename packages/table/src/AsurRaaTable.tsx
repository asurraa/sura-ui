/* eslint-disable indent */
import {
  CalendarOutlined,
  CloseOutlined,
  ColumnWidthOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  TableOutlined,
} from "@ant-design/icons";
import {
  Button,
  ButtonProps,
  DatePicker,
  Dropdown,
  Menu,
  MenuItemProps,
  Modal,
  ModalFuncProps,
  Popover,
  Table,
  TableProps,
} from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Search from "antd/lib/input/Search";
import MenuItem from "antd/lib/menu/MenuItem";
import { ColumnProps } from "antd/lib/table";
import moment from "moment";
import { Fragment, ReactElement, ReactNode, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useGetConfigAsurRaaTableApi } from "./AsurRaaTableProvider";

/**
 * @author lyhourchhen
 * @see [@AsurRaa](https://developer.asurraa.com)
 * @date 2021
 */

const Flexbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaddingWrapper = styled.div`
  padding-bottom: 20px;
`;

type dataIndexManipulator<T> = T extends T ? keyof T : any;

// @ts-ignore
export interface AsurRaaColumnsProps<T = any> extends ColumnProps<T> {
  dataIndex?: dataIndexManipulator<T>;
}
// @ts-ignore
export interface AsurRaaColumnsInterface<T = any> extends ColumnProps<T> {
  dataIndex?: dataIndexManipulator<T>;
}

export interface refreshButtonProps extends ButtonProps {
  animate?: boolean;
}

export type CaslAbilitySubject = "all";

type ViewMode = "COLUMN" | "TABLE" | "CALENDER";
export interface AsurRaaTableProps<T> {
  antdTableProps?: TableProps<T>;
  createButton?: ButtonProps | undefined;
  refreshButton?: refreshButtonProps | undefined;
  asurRaaColumnProps: Array<AsurRaaColumnsProps>;
  data: Array<T>;
  dataAllCSV?: Array<any> | undefined;
  CSVFilename?: string | undefined;
  dataFilterCSV?: Array<any> | undefined;
  viewDefault?: ViewMode;
  renderMoreButtonHeader?: JSX.Element | ReactNode;
  noNeedHeader?: boolean;
  customWidthActionColumn?: number;
  renderAnotherChildrenOnRightSide?: ReactNode | JSX.Element;
  noActionColumn?: boolean;
  detailActionText?: string;
  isVisibleColumn?: boolean;
  noViewAs?: boolean;
  abilitySubject?: CaslAbilitySubject;
  noNoColumn?: boolean;
  pageChange?: number;
  renderMoreActionButton?: (props: T) => ReactElement<typeof MenuItem>;
  detailActionButton?: (props: T) => MenuItemProps | undefined;
  deleteActionButton?: (props: T) => ModalFuncProps | undefined;
  editActionButton?: (props: T) => MenuItemProps | undefined;
  renderOwnViewColumn?: (props: Array<T>) => JSX.Element | ReactNode;
  renderOwnViewCalender?: (props: Array<T>) => JSX.Element | ReactNode;
  onSearchResult?: (searchData: any) => void;
  onSearchClearTrigger?: () => void;
  onChangeViewMode?: (value: any) => void;
  onChangeFilterDataDate?: (value: Array<string>, momentProps: any) => void;
  onTableViewModeChange?: (value: ViewMode) => void;
}

// * main
export const AsurRaaTable = <T extends unknown>(
  props: AsurRaaTableProps<T>
): ReactElement | null => {
  const context = useGetConfigAsurRaaTableApi();
  const titleConfig = context?.overallTitleConfig;

  const ability = context?.caslAppAbility;

  const dateAsurRaaFormatOnlyDateNotWithTime =
    context?.formateDate ?? "YYYY-MM-DD";

  const isAbilityUndefined = (
    ability: boolean | undefined,
    reactValue: ReactNode
  ) => {
    if (ability === undefined) {
      return reactValue;
    } else {
      return ability ? reactValue : null;
    }
  };

  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<any>();
  const [visibleDropdownState, setVisibleDropdownState] = useState<boolean>(
    false
  );
  const [viewMode, setViewMode] = useState<ViewMode>("TABLE");
  const [stateValueForFilter, setStateValueForFilter] = useState<any[]>([
    moment(
      `${moment().subtract(7, "days").format("YYYY-MM-DD")}`,
      dateAsurRaaFormatOnlyDateNotWithTime
    ),
    moment(
      `${moment().format("YYYY-MM-DD")}`,
      dateAsurRaaFormatOnlyDateNotWithTime
    ),
  ]);
  const [
    stateOnChangeValueSearch,
    setStateOnChangeValueSearch,
  ] = useState<string>();
  const [autoFocusOnSearch, setAutoFocusOnSearch] = useState<boolean>(false);

  useEffect(() => {
    props?.onChangeViewMode?.(viewMode);
  }, [props, viewMode]);

  useEffect(() => {
    if (props.viewDefault === "COLUMN") {
      setViewMode("COLUMN");
    } else if (props.viewDefault === "CALENDER") {
      setViewMode("CALENDER");
    } else if (
      props.viewDefault === "TABLE" ||
      props.viewDefault === undefined
    ) {
      setViewMode("TABLE");
    }
  }, [props.viewDefault]);

  useEffect(() => {
    props?.onTableViewModeChange?.(viewMode);
  }, [props, viewMode]);

  useEffect(() => {
    setDataSource(props.data);
  }, [props.data, props.refreshButton]);

  const deleteModal = (properties: T) => {
    Modal.confirm({
      ...props?.deleteActionButton?.(properties),
      title: t("Confirm"),
      icon: <ExclamationCircleOutlined />,
      okText: t("Sure"),
      cancelText: t("Dismiss"),
    });
  };

  const menu = (properties: T) => (
    <Menu>
      {props.renderMoreActionButton?.(properties)}
      {props.detailActionButton === undefined
        ? null
        : isAbilityUndefined(
            ability?.can("read", props.abilitySubject ?? ""),
            <Menu.Item
              {...props.detailActionButton?.(properties)}
              key={uuid()}
              icon={<EyeOutlined />}
            >
              {props.detailActionText === undefined
                ? t("View Detail")
                : t(props.detailActionText)}
            </Menu.Item>
          )}
      {props.editActionButton === undefined
        ? null
        : isAbilityUndefined(
            ability?.can("update", props.abilitySubject ?? ""),
            <Menu.Item
              {...props.editActionButton?.(properties)}
              key={uuid()}
              icon={<EditOutlined />}
            >
              {t(titleConfig?.editButton ?? "edit")}
            </Menu.Item>
          )}

      {props.deleteActionButton === undefined
        ? null
        : isAbilityUndefined(
            ability?.can("delete", props.abilitySubject ?? ""),
            <Menu.Item
              onClick={() => deleteModal(properties)}
              key={uuid()}
              icon={<DeleteOutlined />}
            >
              {t(titleConfig?.deleteButton ?? "delete")}
            </Menu.Item>
          )}
    </Menu>
  );

  const actionColumnObj: AsurRaaColumnsProps<T> = {
    title: t("Action"),
    key: "action",
    fixed: "right",
    align: "center",
    width:
      props.customWidthActionColumn === undefined
        ? "30px"
        : props.customWidthActionColumn,
    ellipsis: true,
    render: (props) => {
      return (
        <Dropdown overlay={menu(props)} trigger={["click"]}>
          <Button>
            <DownOutlined />
          </Button>
        </Dropdown>
      );
    },
  };
  const NOColumnObj: AsurRaaColumnsProps<T> = {
    title: t("N.O"),
    key: "no",
    fixed: "right",
    align: "center",
    width: "20px",
    ellipsis: true,
    render: (__, _, index) => {
      const calculatePage = (index: number) => {
        if (props.pageChange === 1 || props.pageChange === undefined) {
          return index + 1;
        } else {
          return (props.pageChange - 1) * 10 + index + 1;
        }
      };
      return <p>{calculatePage(index)}</p>;
    },
  };

  const columnsWithAction: Array<AsurRaaColumnsProps<T>> = [
    NOColumnObj,
    ...props.asurRaaColumnProps,
    actionColumnObj,
  ];
  const columnsNoAction: Array<AsurRaaColumnsProps<T>> = [
    NOColumnObj,
    ...props.asurRaaColumnProps,
  ];

  const mergeColumns = props.noActionColumn
    ? columnsNoAction
    : columnsWithAction;

  const mergeColumnsWithKey = mergeColumns.map((data, index) => {
    return {
      ...data,
      key: index,
    };
  });

  const ChangeViewMode = (
    <Menu>
      <Menu.Item onClick={() => setViewMode("TABLE")} key={uuid()}>
        <TableOutlined /> Table
      </Menu.Item>
      {props.renderOwnViewColumn === undefined ? null : (
        <Menu.Item onClick={() => setViewMode("COLUMN")} key={uuid()}>
          <ColumnWidthOutlined /> Column
        </Menu.Item>
      )}
      {props.renderOwnViewCalender === undefined ? null : (
        <Menu.Item onClick={() => setViewMode("CALENDER")} key={uuid()}>
          <CalendarOutlined /> Calender
        </Menu.Item>
      )}
    </Menu>
  );

  const visibleMenu = (
    <Menu>
      {props.asurRaaColumnProps?.map((column, index) => {
        return (
          <Menu.Item key={index}>
            <Checkbox>{column.title}</Checkbox>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const ComponentHeader = (): JSX.Element => {
    return (
      <PaddingWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              {isAbilityUndefined(
                ability?.can("read", props.abilitySubject ?? ""),
                <Fragment>
                  {props.createButton !== undefined ? (
                    <Button {...props.createButton} style={{ marginRight: 20 }}>
                      <PlusCircleOutlined />
                      {t(titleConfig?.createButton ?? "add")}
                    </Button>
                  ) : null}
                </Fragment>
              )}
              {props.refreshButton !== undefined ? (
                <Fragment>
                  <Button {...props.refreshButton} style={{ marginRight: 20 }}>
                    <Loading3QuartersOutlined
                      spin={props.refreshButton.animate}
                    />
                    {t(titleConfig?.refreshButton ?? "refresh")}
                  </Button>
                </Fragment>
              ) : null}
            </div>
            <div>
              {props?.renderMoreButtonHeader === undefined
                ? null
                : props?.renderMoreButtonHeader}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {props.renderAnotherChildrenOnRightSide === undefined ? null : (
              <div style={{ marginRight: 20 }}>
                {props.renderAnotherChildrenOnRightSide}
              </div>
            )}
            {props.onChangeFilterDataDate !== undefined && (
              <DatePicker.RangePicker
                // @ts-ignore
                defaultValue={stateValueForFilter}
                onChange={(value) => {
                  const formatStartDate = moment(value?.[0]).format(
                    dateAsurRaaFormatOnlyDateNotWithTime
                  );
                  const formatEndDate = moment(value?.[1]).format(
                    dateAsurRaaFormatOnlyDateNotWithTime
                  );
                  const formatDate = [formatStartDate, formatEndDate];

                  props?.onChangeFilterDataDate?.(formatDate, value);

                  setStateValueForFilter([
                    moment(
                      `${formatStartDate}`,
                      dateAsurRaaFormatOnlyDateNotWithTime
                    ),
                    moment(
                      `${formatEndDate}`,
                      dateAsurRaaFormatOnlyDateNotWithTime
                    ),
                  ]);
                }}
                allowClear={false}
                style={{ marginRight: 20 }}
              />
            )}
            {props.renderOwnViewColumn === undefined &&
            props.renderOwnViewCalender === undefined ? null : (
              // eslint-disable-next-line indent
              <Fragment>
                {props.noViewAs === true ? null : (
                  <Dropdown overlay={ChangeViewMode} trigger={["click"]}>
                    <Button style={{ marginRight: 20 }}>
                      {t("view as")} <DownOutlined />
                    </Button>
                  </Dropdown>
                )}
              </Fragment>
            )}

            {props.dataAllCSV !== undefined ||
            props.dataFilterCSV !== undefined ? (
              <div>
                <Popover
                  placement="bottom"
                  content={
                    <Fragment>
                      {props.dataAllCSV !== undefined ? (
                        <CSVLink
                          data={props?.dataAllCSV}
                          filename={
                            props.CSVFilename
                              ? `${props.CSVFilename}.csv`
                              : "all-data.csv"
                          }
                        >
                          <a>All Data</a>
                        </CSVLink>
                      ) : null}
                      {props.dataFilterCSV !== undefined ? (
                        <CSVLink
                          data={props?.dataFilterCSV}
                          filename={"filtered-data.csv"}
                        >
                          <br />
                          <a>Filtered Data</a>
                        </CSVLink>
                      ) : null}
                    </Fragment>
                  }
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>Export CSV</div>
                    </div>
                  }
                  trigger="click"
                >
                  <Button style={{ marginRight: 20 }}>{t("export CSV")}</Button>
                </Popover>
              </div>
            ) : null}

            {props.isVisibleColumn !== undefined ? (
              <div>
                <Dropdown
                  overlay={visibleMenu}
                  trigger={["click"]}
                  visible={visibleDropdownState}
                  onVisibleChange={(visible: boolean) => {
                    setVisibleDropdownState(visible);
                  }}
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Button style={{ marginRight: 20 }}>Visible Column</Button>
                  </a>
                </Dropdown>
              </div>
            ) : null}

            {props.onSearchResult !== undefined ||
            props.onSearchResult === true ? (
              <Fragment>
                <Search
                  defaultValue={stateOnChangeValueSearch}
                  placeholder={t("Search")}
                  onBlur={() => {
                    setAutoFocusOnSearch(false);
                  }}
                  autoFocus={autoFocusOnSearch}
                  onChange={(e) => {
                    const searchValue = e.target.value;

                    if (searchValue.length === 0) {
                      setStateOnChangeValueSearch("");
                      setAutoFocusOnSearch(true);
                      props?.onSearchClearTrigger?.();
                    }
                  }}
                  onSearch={(searchValue) => {
                    setStateOnChangeValueSearch(searchValue);
                    setAutoFocusOnSearch(true);
                    props?.onSearchResult?.(searchValue);
                  }}
                  style={{ width: 200 }}
                />
                <Fragment>
                  {props.onSearchClearTrigger === undefined ? null : (
                    <Button
                      style={{ width: 10, marginLeft: "-2px" }}
                      onClick={() => {
                        setStateOnChangeValueSearch("");
                        setAutoFocusOnSearch(false);
                        props?.onSearchClearTrigger?.();
                      }}
                    >
                      <Flexbox>
                        <CloseOutlined />
                      </Flexbox>
                    </Button>
                  )}
                </Fragment>
              </Fragment>
            ) : null}
          </div>
        </div>
      </PaddingWrapper>
    );
  };

  // * Main Table
  const ViewAsTable = (): JSX.Element => {
    return (
      <Fragment>
        <Table
          // @ts-ignore
          columns={mergeColumnsWithKey}
          dataSource={dataSource}
          // scroll={{ x:  }}
          {...props.antdTableProps}
          loading={{
            // @ts-ignore // default={false}
            spinning: props.antdTableProps?.loading ?? false,
            indicator: (
              <Flexbox>
                <LoadingOutlined
                  style={{
                    fontSize: 30,
                  }}
                  spin
                />
              </Flexbox>
            ),
          }}
        />
      </Fragment>
    );
  };

  const ViewAsColumn = (): JSX.Element => {
    return (
      <Fragment>
        {props.renderOwnViewColumn === undefined ? (
          <p>Column should be render by yourself</p>
        ) : (
          props?.renderOwnViewColumn?.(props.data)
        )}
      </Fragment>
    );
  };

  const ViewAsCalender = (): JSX.Element => {
    return (
      <Fragment>
        {props.renderOwnViewCalender === undefined ? (
          <p>Calender should be render by yourself</p>
        ) : (
          props?.renderOwnViewCalender?.(props.data)
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {isAbilityUndefined(
        ability?.can("read", props.abilitySubject ?? ""),
        <Fragment>
          {props.noNeedHeader ? null : <ComponentHeader />}
          {viewMode === "COLUMN" ? (
            <ViewAsColumn />
          ) : viewMode === "CALENDER" ? (
            <ViewAsCalender />
          ) : (
            <ViewAsTable />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
