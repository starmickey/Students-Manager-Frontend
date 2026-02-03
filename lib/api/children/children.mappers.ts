import { Child, ChildApi } from "./children.types";

export function parseChildApi(raw: ChildApi): Child {
  return {
    ...raw,
    birthDay: raw.birthDay ? new Date(raw.birthDay) : null,
    dni: raw.dni ?? null,
    address: raw.address ?? null,
  };
}
