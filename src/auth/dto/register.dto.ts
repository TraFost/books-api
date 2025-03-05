import { z } from 'zod';

export const RegisterSchema = z
  .object({
    username: z.string().min(3).max(20),
    password: z.string().min(6),
    name: z.string().min(1),
  })
  .strict(); // strict() ensures that only the fields defined in the schema are allowed

export type RegisterDto = z.infer<typeof RegisterSchema>; // this exports the type of the schema {username: string, password: string, email: string, name: string}
