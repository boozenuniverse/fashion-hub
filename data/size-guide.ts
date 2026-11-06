/** Indicative size charts. Confirm against your suppliers' own charts before launch. */
export interface SizeTable { id: string; title: string; note: string; head: string[]; rows: string[][] }

export const sizeTables: SizeTable[] = [
  { id: "womens", title: "Women's clothing", note: "Body measurements in centimetres. If you are between sizes, choose the larger size.", head: ["Size", "Bust", "Waist", "Hip"], rows: [["XS", "80-84", "62-66", "88-92"], ["S", "84-88", "66-70", "92-96"], ["M", "88-92", "70-74", "96-100"], ["L", "92-98", "74-80", "100-106"], ["XL", "98-104", "80-86", "106-112"]] },
  { id: "mens", title: "Men's clothing", note: "Body measurements in centimetres.", head: ["Size", "Chest", "Waist"], rows: [["S", "92-97", "78-83"], ["M", "97-102", "83-88"], ["L", "102-107", "88-93"], ["XL", "107-112", "93-98"], ["XXL", "112-118", "98-104"]] },
  { id: "shoes", title: "Shoes", note: "EU sizes with approximate UK and US equivalents and foot length. Brands vary, so measure your foot and compare.", head: ["EU", "UK", "US", "Foot length (cm)"], rows: [["36", "3.5", "5.5", "22.8"], ["37", "4", "6.5", "23.5"], ["38", "5", "7", "24.1"], ["39", "6", "8", "24.8"], ["40", "6.5", "9", "25.4"], ["41", "7.5", "10", "26.0"], ["42", "8", "9 (men's)", "26.7"], ["43", "9", "10 (men's)", "27.3"], ["44", "9.5", "10.5 (men's)", "27.9"], ["45", "10.5", "11.5 (men's)", "28.6"]] },
  { id: "rings", title: "Rings", note: "US sizes with inner diameter and circumference in millimetres.", head: ["US size", "Diameter (mm)", "Circumference (mm)"], rows: [["6", "16.5", "51.9"], ["7", "17.3", "54.4"], ["8", "18.2", "57.0"], ["9", "18.9", "59.5"]] },
];

export const measuringSteps = [
  "Use a soft tape measure over light clothing or underwear.",
  "Bust or chest: measure around the fullest part, keeping the tape level.",
  "Waist: measure around the narrowest part of your torso.",
  "Hip: measure around the fullest part of your hips.",
  "Foot: stand on paper, mark the heel and longest toe, and measure the distance.",
];
