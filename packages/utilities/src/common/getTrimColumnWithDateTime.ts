// eslint-disable-next-line import/named
import moment, { Moment } from "moment";
import voca from "voca";
import { dateAsurRaaFormatOnlyDate } from "./getDateFormate";

import { Logger } from "./logger";

export const getTrimIntoColumnOnlyDate = (
  dateString: string | undefined
): string => {
  // const trimDate = voca.split(dateString, "T");
  // return trimDate[0];

  if (!dateString) {
    return "";
  }
  const date = moment(dateString).format(dateAsurRaaFormatOnlyDate);

  if (date === "Invalid date") {
    return "";
  }
  return date;
};

export const getTrimIntoColumnOnlyTime = (
  dateString: string | undefined
): string => {
  const time = moment(dateString).format("h:mm:ss a");
  return time;
};

export const getTrimIntoColumnOnlyTimeWithoutSecond = (
  dateString: string | undefined
): string => {
  const time = moment(dateString).format("h:mm a");
  return time;
};

export const getTrimIntoColumnDateAndTime = (
  dateString: string | undefined | Date | Moment
): string => {
  const time = moment(dateString).format("YYYY-MM-DD h:mm:ss a");
  return time;
};
