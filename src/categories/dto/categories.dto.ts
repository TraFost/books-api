import { z as zod } from 'zod';

export const CreateCategoriesSchema = zod.object({
  categories: zod.array(zod.string().min(3)),
});

export const UpdateCategoriesSchema = zod.object({
  categories: zod.array(
    zod.object({
      id: zod.string(),
      name: zod.string().min(3),
    }),
  ),
});

export type CreateCategoriesDto = zod.infer<typeof CreateCategoriesSchema>;
export type UpdateCategoriesDto = zod.infer<typeof UpdateCategoriesSchema>;
