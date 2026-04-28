import * as z from "zod";

export const checkOutSchema = z.object({
  shippingAddress: z.object({
    details: z.string().nonempty("Details is required"),
    city: z.string().nonempty("City is required"),
    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^01[0125][0-9]{8}$/, "Phone number must be an Egyptian number"),
  }),
});

export type CheckOutSchemaType = z.infer<typeof checkOutSchema>;