import {
  RegisterChildInput,
  UpdateChildFieldInput,
} from "@/features/children/schemas/children.schema";
import { http } from "../../http/http-client";
import type { Child } from "./children.types";

export function registerChild(input: RegisterChildInput) {
  return http<Child, RegisterChildInput>("/children", {
    method: "POST",
    body: input,
  });
}

export function updateChildField({ id, ...input }: UpdateChildFieldInput) {
  return http<Child, Omit<UpdateChildFieldInput, "id">>(`/children/${id}`, {
    method: "PATCH",
    body: input,
  });
}
