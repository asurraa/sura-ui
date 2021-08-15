import { Button } from "antd";
import { FC, Fragment, useEffect, useState } from "react";

const weekList: {
  short: string | undefined;
  full: string | undefined;
  id: number | undefined;
}[] = [
  {
    full: "Sunday",
    short: "Sun",
    id: 0,
  },
  { full: "Monday", short: "Mon", id: 1 },
  {
    full: "Tuesday",
    short: "Tues",
    id: 2,
  },
  {
    full: "Wednesday",
    short: "Wed",
    id: 3,
  },
  {
    full: "Thursday",
    short: "Thur",
    id: 4,
  },
  { full: "Friday", short: "Fri", id: 5 },
  { full: "Saturday", short: "Sat", id: 6 },
];
export interface AsurRaaInlineWeekDayPickerProps {
  displayAs?: "Short" | "Full";
  value?: number[] | string;
  isViewMode?: boolean;
  onChange?: (value: string, fullValue: typeof weekList) => void;
  defaultValue?: number[] | string;
}

export const AsurRaaInlineWeekDayPicker: FC<AsurRaaInlineWeekDayPickerProps> = (
  props
) => {
  const [selectState, setSelectState] = useState<typeof weekList>([]);

  useEffect(() => {
    if (typeof props.value === "string") {
      const parseFromStringValue = props.value.split(",").map((item) => {
        return parseInt(item, 10);
      });
      const mapAsFullData = parseFromStringValue.map((value) => {
        return {
          ...weekList?.find((data) => data.id === value),
        };
      });

      // @ts-ignore
      return setSelectState(mapAsFullData);
    }
  }, [props.value]);

  const isSelectFromArray = (id: number): boolean => {
    if (props.isViewMode) {
      if (typeof props.value === "string") {
        const parseFromStringValue = props.value
          .split(",")
          .map(function (item) {
            return parseInt(item, 10);
          });
        return parseFromStringValue?.includes(id);
      } else if (typeof props.value === "undefined") {
        return false;
      } else {
        return props?.value?.includes(id);
      }
    } else {
      return selectState?.some((e) => e.id === id);
    }
  };

  useEffect(() => {
    const mapToKey = selectState.map((value) => value.id);
    const valueAsString = mapToKey + "";
    props?.onChange?.(valueAsString, selectState);
  }, [props, selectState]);

  useEffect(() => {
    if (typeof props.defaultValue === "string") {
      const parseFromStringValue = props.defaultValue.split(",").map((item) => {
        return parseInt(item, 10);
      });
      const mapAsFullData = parseFromStringValue.map((value) => {
        return {
          ...weekList?.find((data) => data.id === value),
        };
      });
      // @ts-ignore
      return setSelectState(mapAsFullData);
    }
  }, [props.defaultValue, props.value]);

  return (
    <Fragment>
      <Button.Group>
        {weekList.map((value, index) => {
          return (
            <Button
              onClick={() => {
                const isAlreadyHaveInArray = selectState.some(
                  (e) => e.id === value.id
                );
                if (isAlreadyHaveInArray) {
                  const takeItOutOfArray = selectState.filter(
                    (e) => e.id !== value.id
                  );
                  setSelectState(takeItOutOfArray);
                } else {
                  // Add
                  setSelectState([
                    ...selectState,
                    {
                      ...value,
                    },
                  ]);
                }
              }}
              style={{
                /* stylelint-disable */
                cursor: props.isViewMode ? "not-allowed" : "pointer",
              }}
              type={
                // @ts-ignore
                isSelectFromArray(value?.id) ? "primary" : "default"
              }
              key={index}
            >
              {value.short}
            </Button>
          );
        })}
      </Button.Group>
    </Fragment>
  );
};
