// *
// * Trim date format to only date
// *

import moment from "moment";

const dateAsurRaaFormatOnlyDate = "YYYY-MM-DD";
export const getTrimIntoColumnOnlyDate = (
  dateString: string | undefined
): string => {
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
  dateString: string | undefined | Date
): string => {
  const time = moment(dateString).format("YYYY-MM-DD h:mm:ss a");
  return time;
};
