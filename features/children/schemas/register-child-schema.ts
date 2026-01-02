import { z } from "zod";

export const registerChildSchema = z.object({
  name: z.string("Name must be a valid string").min(1, "Name cannot be empty"),

  surname: z
    .string("Surname must be a valid string")
    .min(1, "Surname cannot be empty"),

  birthDay: z.date("Birth date must be a valid date").optional(),

  dni: z
    .string("DNI must be a text value")
    .min(6, "DNI must have at least 6 characters")
    .optional(),

  address: z.string("Address must be a text value").optional(),
});

export type RegisterChildInput = z.infer<typeof registerChildSchema>;

