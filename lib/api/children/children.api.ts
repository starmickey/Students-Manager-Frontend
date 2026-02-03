"use server";

import {
  RegisterChildInput,
  UpdateChildFieldInput,
  UpdateChildInput,
} from "@/features/children/schemas/children.schema";
import { http } from "../../http/http-client";
import type { Child, ChildApi } from "./children.types";
import { parseChildApi } from "./children.mappers";
import { PaginatedResponse } from "../shared/pagination.types";

interface GetChildrenProps {
  page: number;
  pageSize: number;
  sortBy: string;
  order: "asc" | "desc";
}

export async function getChildren({
  page,
  pageSize,
  sortBy,
  order,
}: GetChildrenProps) {
  return http<PaginatedResponse<Child>>(
    `/children?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}`
  );
}

export async function getChildById(id: number) {
  return http<ChildApi>(`/children/${id}`).then((res) => parseChildApi(res));
}

export async function registerChild(input: RegisterChildInput) {
  return http<Child, RegisterChildInput>("/children", {
    method: "POST",
    body: input,
  });
}

export async function updateChild({ id, ...input }: UpdateChildInput) {
  return http<Child, Omit<UpdateChildInput, "id">>(`/children/${id}`, {
    method: "PUT",
    body: input,
  });
}

export async function updateChildField({
  id,
  ...input
}: UpdateChildFieldInput) {
  return http<Child, Omit<UpdateChildFieldInput, "id">>(`/children/${id}`, {
    method: "PATCH",
    body: input,
  });
}

export async function deleteChild(id: number) {
  return http<number, void>(`/children/${id}`, {
    method: "DELETE",
  });
}
