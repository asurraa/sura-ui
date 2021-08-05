/**
 * Copyright (c) AsurRaa, Inc. and its affiliates. All rights reserved.
 *
 * This file provided by AsurRaa is for non-commercial testing and evaluation
 * purposes only. AsurRaa reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * AsurRaa BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export { Logger } from "./common/logger";
export { getIsProductionModeFunc } from "./common/getIsProductionMode";
export { getFixNumberSeparateFunc } from "./common/getFixNumberSeparator";
export {
  getGenerateDayFromMonth,
  CalculatorForDateMonthInterface,
} from "./common/getCalculatorForDate";
export { getCheckIsEditableDataNullFuc } from "./common/getCheckIsEditableOrNot";
export { getCheckIsTokenExpired } from "./common/getCheckIsExpiredToken";
export { getCurrentDate } from "./common/getCurrentDate";
export {
  dateAsurRaaFormat,
  dateAsurRaaFormatOnlyDate,
  momentDateFormatAsuRaaBaseOnServer,
  momentTimeFormatAsuRaaBaseOnServer,
  timeAsurRaaFormat,
} from "./common/getDateFormate";
export {
  getDeleteValueFromArray,
  getDeleteValueFromObject,
} from "./common/getDeleteValueFromObjectAndArray";
export {
  getEnumToArrayFunc,
  getEnumToArrayFuncGeneric,
} from "./common/getEnumToArray";
export { getFindReturnSingleArrayObj } from "./common/getFindReturnSingleArrayObj";
export { getGenerateColumnTableKey } from "./common/getGenerateColumnTableKey";
export { getGenerateLoopNumberOutArray } from "./common/getGenerateLoopNumberOutArray";
export { getIsImageUrlIsValid } from "./common/getIsImageUrlIsValid";
export { getPhraseValidityToMonth } from "./common/getPhraseValidityToMonth";
export { getPushRouteNewTab } from "./common/getPushRouteNewTab";
export { getQueryDataDetail } from "./common/getQueryDataDetail";
export { getRemoveStringWhiteSpace } from "./common/getRemoveStringWhiteSpace";
export { getRenderStatusColor } from "./common/getRenderStatusColor";
export { getReturnDataFromSingleRoute } from "./common/getReturnDataFromSingleRoute";
export {
  GetReturnEmptyTagProps,
  getReturnEmptyTag,
} from "./common/getReturnEmptyTag";
export { getReturnSingleImageFromServer } from "./common/getReturnImageFromServer";
export { getReturnRenderFromIdToName } from "./common/getReturnRenderFromIdToName";
export { getReturnZeroWhenUndefine } from "./common/getReturnZeroWhenUndefine";
export {
  getParseArrayToString,
  getParseStringToArray,
} from "./common/getStringAndArray";
export { getToFix2PrecisionAsNumberType } from "./common/getToFixNumberType";
export {
  getTrimIntoColumnDateAndTime,
  getTrimIntoColumnOnlyDate,
  getTrimIntoColumnOnlyTime,
  getTrimIntoColumnOnlyTimeWithoutSecond,
} from "./common/getTrimColumnWithDateTime";
