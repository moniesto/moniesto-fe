import { CreatePostReq } from "../../../interfaces/requests";

export const normalizePostFromForm = (
  formValue: CreatePostReq & {
    crypto_currency: {
      currency: string;
      price: number;
    };
  }
): CreatePostReq => {
  const currency = formValue.crypto_currency.currency;
  const { crypto_currency, ...formData } = formValue;

  return {
    ...formData,
    duration: new Date(formData.duration).toISOString(),
    currency,
  };
};

export const roundNumber = (value: number = 0, digitAfterComma: number = 6) => {
  if (isNaN(value)) value = 0;

  const valueArr = value.toString().split(".");
  const fixedValue = valueArr[1]
    ? Number(valueArr[0] + "." + valueArr[1]?.substring(0, digitAfterComma))
    : Number(valueArr[0]);

  return fixedValue;
};
export const operationByDirection = (direction: string) =>
  direction === "long" ? 1 : -1;
