import { z } from "zod";

export const albumNewFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "O título deve ter no mínimo 3 caracteres" })
    .max(255),
  photosIds: z.array(z.string().uuid()).optional(),
});

export type AlbumNewFormSchema = z.infer<typeof albumNewFormSchema>;
