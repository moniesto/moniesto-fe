export const colorByNumberValue = (value?: number) =>
  value ? (value > 0 ? "var(--color-success)" : "var(--color-fail)") : "";
