import { Select } from "antd";
import moment from "moment";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AsurRaaSelectProps } from "@asurraa/sura-ui-select";
import { useGetAsurRaaDropdown } from "./AsurRaaDropdownFilterProvider";

export type AsurRaaFilterOptionType = {
  name: string;
  value: {
    startDate: string;
    endDate: string;
  };
};
export interface AsurRaaDropdownFilterProps extends AsurRaaSelectProps {
  //* This should be moment format type
  filterDateFormat?: string;
  filterOnChange?: (value: AsurRaaFilterOptionType) => void;
  emitFilterValueFromName?: Array<string>;
}

export const AsurRaaDropdownFilter: FC<AsurRaaDropdownFilterProps> = (
  props
) => {
  const { t } = useTranslation();
  const global = useGetAsurRaaDropdown();
  const dateTimeFormat =
    props.filterDateFormat === undefined
      ? global?.dateFormate
      : props.filterDateFormat;
  const current = moment().format(dateTimeFormat);

  const fullFilterListOption: Array<AsurRaaFilterOptionType> = [
    {
      name: "Today",
      value: {
        endDate: current,
        startDate: moment().format(dateTimeFormat),
      },
    },
    {
      name: "This weeks",
      value: {
        startDate: moment()
          .startOf("week")
          .isoWeekday(1)
          .format(dateTimeFormat),
        endDate: current,
      },
    },
    {
      name: "This months",
      value: {
        startDate: moment()
          .startOf("month")
          .isoWeekday(1)
          .format(dateTimeFormat),
        endDate: current,
      },
    },
    {
      name: "7 Days",
      value: {
        startDate: moment().subtract(7, "days").format(dateTimeFormat),
        endDate: current,
      },
    },
    {
      name: "15 Days",
      value: {
        startDate: moment().subtract(15, "days").format(dateTimeFormat),
        endDate: current,
      },
    },
    {
      name: "30 Days",
      value: {
        startDate: moment().subtract(30, "days").format(dateTimeFormat),
        endDate: current,
      },
    },
  ];

  const emitFilterListOption: Array<AsurRaaFilterOptionType> = fullFilterListOption.filter(
    (option) => !props?.emitFilterValueFromName?.includes(option.name)
  );

  const filterListOption: Array<AsurRaaFilterOptionType> =
    props.emitFilterValueFromName === undefined
      ? fullFilterListOption
      : emitFilterListOption;

  return (
    <Select
      showSearch={false}
      allowClear={false}
      defaultValue={filterListOption[0].name}
      {...props}
      style={{ width: 130 }}
    >
      {filterListOption.map((filter, index) => (
        <Select.Option key={index} value={filter.name}>
          <div
            onClick={() =>
              props?.filterOnChange?.({
                name: filter.name,
                value: filter.value,
              })
            }
          >
            {t(filter.name)}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};
