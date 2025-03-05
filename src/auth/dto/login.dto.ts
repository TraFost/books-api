import { z } from 'zod';

// Define a Zod schema for the login DTO`
export const LoginDtoSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  })
  .strict(); // strict() ensures that only the fields defined in the schema are allowed

export type LoginDto = z.infer<typeof LoginDtoSchema>; // this exports the type of the schema {username: string, password: string}
