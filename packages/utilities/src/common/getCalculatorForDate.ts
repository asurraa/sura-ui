// * *
// *   Generate Days From Month.
// * *

export interface CalculatorForDateMonthInterface {
  name: string;
  value: number;
}

export const getGenerateDayFromMonth = (
  month: number
): CalculatorForDateMonthInterface => {
  return {
    name: `${month} months`,
    value: month * 30,
  };
};
