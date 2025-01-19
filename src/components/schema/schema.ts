import { z as zod } from 'zod';

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
    phoneNumber: zod
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters!' })
    .max(10, { message: 'Phone number should not exceed 10 digits!' }),
});


export type SignInDetailsSchemaType = zod.infer<typeof SignInDetailsSchema>;
export const SignInDetailsSchema = zod.object({
  fullName: zod
    .string()
    .min(1, { message: 'fullName is required!' }),
  altNumber: zod
    .string()
    .optional(),
  localities: zod
  .array(zod.string()) 
    .optional(),
  societies: zod
    .array(zod.string())
    .optional(),
});
