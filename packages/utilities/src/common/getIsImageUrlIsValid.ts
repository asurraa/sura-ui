/* eslint-disable prefer-const */
// @ts-nocheck

// **
// * Generate `key` To avoid the collisions so we consider to use timestamp.
// **

export const getIsImageUrlIsValid = async (url: string): boolean => {
  let s = document.createElement("IMG");
  s.src = url;

  s.onerror = function () {
    return false;
  };
  s.onload = function () {
    return true;
  };
};
