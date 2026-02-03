"use client";

import SuccessScreen from "@/components/templates/success-screen";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterChild } from "@/features/children/hooks/use-register-child";
import {
  RegisterChildInput,
  registerChildSchema,
} from "@/features/children/schemas/children.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

type State = "form" | "success";

export default function RegisterChildForm() {
  const { submit, loading } = useRegisterChild();
  const [state, setState] = useState<State>("form");
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<RegisterChildInput>({
    resolver: zodResolver(registerChildSchema),
    defaultValues: {
      name: "",
      surname: "",
      birthDay: undefined as unknown as Date,
      dni: undefined as unknown as string,
      address: undefined as unknown as string,
    },
  });

  async function onSubmit(values: RegisterChildInput) {
    try {
      await submit(values);
      form.reset();
      setState("success");
    } catch (error) {
      setState("form");
      setError(
        String(error) ?? "There was an unexpected error. Try again later."
      );
    }
  }

  if (state === "success") {
    return <SuccessScreen />;
  }

  return (
    <Form {...form}>
      <h1>Register</h1>
      
      {error && <p className="text-destructive text-sm my-4">{error}</p>}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Surname */}
        <FormField
          control={form.control}
          name="surname"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Birth date */}
        <FormField
          control={form.control}
          name="birthDay"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={
                    field.value ? field.value.toISOString().split("T")[0] : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : undefined
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DNI */}
        <FormField
          control={form.control}
          name="dni"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <Input placeholder="12345678" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          disabled={loading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Street, city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-6">Register</Button>
      </form>
    </Form>
  );
}
