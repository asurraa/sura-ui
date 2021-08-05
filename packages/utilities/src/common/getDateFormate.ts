// * *
// *   Generate Date Base on Date & Time.
// * *

import moment from "moment";
type momentDateFormatAsuRaaBaseOnServerTypeInterface = {
  data: any;
};

export const dateAsurRaaFormat = "YYYY-MM-DD HH:mm:ss";
export const timeAsurRaaFormat = "HH:mm";
export const dateAsurRaaFormatOnlyDate = "YYYY-MM-DD";

export const momentDateFormatAsuRaaBaseOnServer = ({
  data,
}: momentDateFormatAsuRaaBaseOnServerTypeInterface) => {
  return moment(data).format(dateAsurRaaFormat);
};

export const momentTimeFormatAsuRaaBaseOnServer = ({
  data,
}: momentDateFormatAsuRaaBaseOnServerTypeInterface) => {
  return moment(data).format(timeAsurRaaFormat);
};
