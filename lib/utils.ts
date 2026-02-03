import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidNumber(str: string): boolean {
  const safeParse = z.coerce.number().safeParse(str);
  return safeParse.success;
}
