import { useState } from "react";

//* type for store temporary state wile working editable with form
export type SuraEditableType<T> = (T & { id: string }) | undefined;
// * global hook to store editable data state
export const useSuraEditableData = <T extends unknown>(
  data: SuraEditableType<T>
) => {
  return useState<SuraEditableType<T>>(data);
};
