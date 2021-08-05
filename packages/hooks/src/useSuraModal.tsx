import { useState } from "react";

// * global hook to open / off modal
export const useSuraModal = (switcher: boolean) => {
  return useState<boolean>(switcher);
};
