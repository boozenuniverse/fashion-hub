/** Ghana regions offered at checkout (configurable). */
export const ghanaRegions = [
  "Greater Accra", "Ashanti", "Central", "Eastern", "Western", "Western North", "Volta", "Oti",
  "Northern", "Savannah", "North East", "Upper East", "Upper West", "Bono", "Bono East", "Ahafo",
] as const;

export const orderRules = {
  maxQuantityPerLine: 10,
  /** Delivery fees are not invented: they are confirmed by the business when the enquiry is received. */
  deliveryFeeLabel: "Confirmed when your enquiry is received",
};
