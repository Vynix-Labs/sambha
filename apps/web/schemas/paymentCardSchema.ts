import * as yup from "yup";

export const paymentCardSchema = yup.object({
  number: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Enter a valid 16-digit card number"),
  expiry: yup
    .string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter in MM/YY format"),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "CVV must be 3 digits"),
  country: yup.string().required("Billing address is required"),
});

export type PaymentType = yup.InferType<typeof paymentCardSchema>