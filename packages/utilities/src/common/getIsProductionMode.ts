// **
// * Check Weather Developments is Production or developments.
// **

export const getIsProductionModeFunc = ({
  log,
}: {
  log?: boolean;
}): boolean => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return false;
  } else {
    return true;
  }
};
