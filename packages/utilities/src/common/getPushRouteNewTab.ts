// **
// * Get push route by window object.
// **

export const getPushRouteNewTab = (path: string) => {
  return window.open(path, "_blank");
};
