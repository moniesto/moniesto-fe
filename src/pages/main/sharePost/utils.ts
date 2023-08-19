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
