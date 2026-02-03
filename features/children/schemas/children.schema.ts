import { z } from "zod";

export const registerChildSchema = z.object({
  name: z.string("Name must be a valid string").min(1, "Name cannot be empty"),
  surname: z
    .string("Surname must be a valid string")
    .min(1, "Surname cannot be empty"),
  birthDay: z.date("Birth date must be a valid date").nullable().optional(),
  dni: z
    .string("DNI must be a text value")
    .min(6, "DNI must have at least 6 characters")
    .nullable()
    .optional(),
  address: z.string("Address must be a text value").nullable().optional(),
});

export const updateChildSchema = registerChildSchema.extend({
  id: z.number("Id must be a valid number"),
});

export const updateChildFieldSchema = z.object({
  id: z.number("Campo obligatorio"),
  name: z
    .string("Name must be a valid string")
    .min(1, "Name cannot be empty")
    .optional(),
  surname: z
    .string("Surname must be a valid string")
    .min(1, "Surname cannot be empty")
    .optional(),
  birthDay: z
    .union([
      z.date("Birth date must be a valid date"),
      z.null(),
      z
        .string()
        .min(1)
        .transform((value) => new Date(value))
        .refine(
          (date) => !isNaN(date.getTime()),
          "Birth date must be a valid date"
        ),
    ])
    .optional(),
  dni: z
    .string("DNI must be a text value")
    .min(6, "DNI must have at least 6 characters")
    .nullable()
    .optional(),
  address: z.string("Address must be a text value").nullable().optional(),
});

export type RegisterChildInput = z.infer<typeof registerChildSchema>;
export type UpdateChildInput = z.infer<typeof updateChildSchema>;
export type UpdateChildFieldInput = z.infer<typeof updateChildFieldSchema>;
