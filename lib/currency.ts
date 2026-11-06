/** Deterministic Ghana cedi formatting (same output on server and client): "GHS 1,250.00". */
export function formatPrice(amount: number): string {
  const [whole, fraction] = (Math.round(amount * 100) / 100).toFixed(2).split(".");
  return `GHS ${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${fraction}`;
}
