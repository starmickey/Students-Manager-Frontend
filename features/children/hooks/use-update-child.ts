"use client";

import { useState } from "react";
import { registerChild, updateChild } from "@/lib/api/children";
import {
  RegisterChildInput,
  UpdateChildInput,
} from "../schemas/children.schema";

type Mode = "create" | "edit";

export default function useUpdateChild(mode: Mode) {
  const [loading, setLoading] = useState(false);

  async function submit(data: RegisterChildInput | UpdateChildInput) {
    setLoading(true);
    try {
      if (mode === "create") {
        return await registerChild(data as RegisterChildInput);
      } else {
        return await updateChild(data as UpdateChildInput);
      }
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading };
}
