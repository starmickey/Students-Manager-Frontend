"use client";

import { useState } from "react";
import { registerChild } from "@/lib/api/children";
import type { RegisterChildInput } from "@/lib/api/children";

export function useRegisterChild() {
  const [loading, setLoading] = useState(false);

  async function submit(data: RegisterChildInput) {
    setLoading(true);
    try {
      return await registerChild(data);
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading };
}
