/** Swatch colours used by product options and filters. */
export const colourSwatches: Record<string, string> = {
  Espresso: "#302019", Cocoa: "#54372B", Mocha: "#795640", Caramel: "#A77B59", Champagne: "#D8C2A5",
  Ivory: "#EFE9DF", White: "#FFFEFC", Black: "#1F1B19", Charcoal: "#3A3836", Navy: "#1F2A44",
  Emerald: "#1F5A47", Burgundy: "#6B2230", Blush: "#E3C3BB", Sky: "#A9C4DE", Gold: "#B89A69",
  Silver: "#C4C6C8", "Rose Gold": "#C99A8A", Nude: "#D2AE92", Rose: "#B5575F", Plum: "#5A2D45",
  "Natural Black": "#1A1412", "Dark Brown": "#3B2A21", "Honey Blonde": "#C9A36A", Tan: "#B58A5E",
  Olive: "#5E6038", Cream: "#F1E8D6", Pearl: "#EDE6DA", Fair: "#F1D5BF", Light: "#E4BF9F",
  Medium: "#C79A74", Tan2: "#A97B58", Deep: "#6E4733",
};

export const swatchFor = (name: string): string => colourSwatches[name] ?? "#D8C2A5";

/** Relative luminance 0..1 (used to pick readable backgrounds for generated sample images). */
export function luminance(hex: string): number {
  const n = parseInt(hex.replace("#", ""), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
