import {
  RegisterChildInput,
  UpdateChildFieldInput,
  UpdateChildInput,
} from "@/features/children/schemas/children.schema";
import { http } from "../../http/http-client";
import type { Child, ChildApi } from "./children.types";
import { parseChildApi } from "./children.mappers";

export function registerChild(input: RegisterChildInput) {
  return http<Child, RegisterChildInput>("/children", {
    method: "POST",
    body: input,
  });
}

export function updateChild({ id, ...input }: UpdateChildInput) {
  return http<Child, Omit<UpdateChildInput, "id">>(`/children/${id}`, {
    method: "PUT",
    body: input,
  });
}

export function updateChildField({ id, ...input }: UpdateChildFieldInput) {
  return http<Child, Omit<UpdateChildFieldInput, "id">>(`/children/${id}`, {
    method: "PATCH",
    body: input,
  });
}

export function getChildById(id: number) {
  return http<ChildApi>(`/children/${id}`).then((res) => parseChildApi(res));
}
