import { useState } from "react";

//* type alias to number page in every page
export type SuraPage = number;

// * global hook to get page in every form page
export const useSuraPage = (page: SuraPage) => {
  return useState<SuraPage>(page);
};
