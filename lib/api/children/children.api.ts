import { http } from "../../http/http-client";
import type { RegisterChildInput, Child } from "./children.types";

export function registerChild(input: RegisterChildInput) {
  return http<Child, RegisterChildInput>("/children", {
    method: "POST",
    body: input,
  });
}
