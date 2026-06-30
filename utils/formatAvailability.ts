export function formatAvailability(status?: string, shipping?: string): string {
  const stockLabel = status ?? "In stock";
  const shippingLabel = shipping
    ?.replace(/^Ships in /i, "ships in ")
    .replace(/ business days/i, " days");

  return shippingLabel ? `${stockLabel} — ${shippingLabel}` : stockLabel;
}
