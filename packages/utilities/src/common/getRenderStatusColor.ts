// *
// * Generate render color from STATUS
// *

/* eslint-disable indent */
export const getRenderStatusColor = (statusValue: any) => {
  switch (statusValue) {
    case "pending":
      return "yellow";
    case "canceled":
      return "red";
    case "rejected":
      return "brown";
    case "approved":
      return "green";
    default:
  }
};
