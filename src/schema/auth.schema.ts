import * as z from "zod";
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is Required")
      .min(5, "Name must be at least 5 characters")
      .max(17, "Name must be no exceed 15 characters"),
    email: z.email("email is invalid").min(1,"email is Required"),
    password: z
      .string()
      .min(1,"password is Required")
      .min(6, "password must be at least 8 characters")
      .max(50, "password must not exceed 50 characters"),
    rePassword: z.string().min(1,"repassword is Required"),
    phone: z
      .string()
      .min(1,"Phone number is required")
      .regex(/^01[0125][0-9]{8}$/, "Phone number must be for Egypt"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "password and repassword must match",
  });

  export type registerSchemaType = z.infer<typeof registerSchema>

  export const loginSchema = z
  .object({
    
    email: z.email("email is invalid").min(1,"email is Required"),
    password: z
      .string()
      .nonempty("password is Required")
      .min(6, "password must be at least 8 characters")
      .max(50, "password must not exceed 50 characters"),
  })
  

  export type loginSchemaType = z.infer<typeof loginSchema>