import { ComponentProps } from "react";
import { EditableInput } from "@/components/ui/editable-input";

type EditableInputProps = ComponentProps<typeof EditableInput>;

type EditableCellProps<
  TRow extends { id: number },
  TField extends keyof TRow
> = {
  row: TRow;
  field: TField;
  onSubmit: (
    payload: { id: number } & Partial<Pick<TRow, TField>>
  ) => Promise<void>;
} & Omit<EditableInputProps, "defaultValue" | "onSubmitValue" | "onSubmit">;

export function EditableCell<
  TRow extends { id: number },
  TField extends keyof TRow
>({
  row,
  field,
  onSubmit,
  inputSize = "sm",
  ...editableInputProps
}: EditableCellProps<TRow, TField>) {
  const value = row[field];

  return (
    <EditableInput
      {...editableInputProps}
      defaultValue={value?.toString() ?? ""}
      inputSize={inputSize}
      onSubmitValue={async (newValue) => {
        if (newValue === value) return;

        await onSubmit({
          id: row.id,
          [field]: newValue,
        } as { id: number } & Partial<Pick<TRow, TField>>);
      }}
    />
  );
}
