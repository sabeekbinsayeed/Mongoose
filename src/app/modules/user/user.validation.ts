import { z } from 'zod'

const userNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
})

export const userValidationSchema = z.object({
  userId: z.number().int(),
  username: z.string(),
  password: z.string(),
  fullName: userNameSchema,
  age: z.number().int(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  isDeleted: z.boolean().optional(),
})
