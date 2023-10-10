export const colorByNumberValue = (value?: number) =>
  value ? (value > 0 ? "var(--color-success)" : "var(--color-fail)") : "";
export const colorLightByNumberValue = (value?: number) =>
  value
    ? value > 0
      ? "var(--color-success-light)"
      : "var(--color-fail-light)"
    : "";
