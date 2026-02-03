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
import useUpdateChild from "@/features/children/hooks/use-update-child";
import {
  registerChildSchema,
  updateChildSchema,
} from "@/features/children/schemas/children.schema";
import { Child } from "@/lib/api/children";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type State = "form" | "success";

const creationDefaultValues = {
  name: "",
  surname: "",
  birthDay: null,
  dni: null,
  address: null,
};

interface CreateChildForm {
  mode: "create";
  child?: never;
}

interface EditChildForm {
  mode: "edit";
  child: Child;
}

export type UpdateChildForm = CreateChildForm | EditChildForm;

export default function UpdateChildForm({ mode, child }: UpdateChildForm) {
  const { submit, loading } = useUpdateChild(mode);
  const [state, setState] = useState<State>("form");
  const [error, setError] = useState<string | undefined>(undefined);

  const schema = mode === "create" ? registerChildSchema : updateChildSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: child ?? creationDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof schema>) {
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
      <div className="mb-8">
        <h1>
          {mode === "create" ? "Register" : `${child.name} ${child.surname}`}
        </h1>
      </div>

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
                <Input
                  placeholder="12345678"
                  type="number"
                  {...field}
                  value={field.value ?? ""}
                />
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
                <Input
                  placeholder="Street, city"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-6">
          {mode === "create" ? "Register" : "Save"}
        </Button>
      </form>
    </Form>
  );
}
