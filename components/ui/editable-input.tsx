import * as React from "react";
import { Input } from "./input";

type EditableInputProps = React.ComponentProps<typeof Input> & {
  onSubmitValue?: (value: string) => void;
};

export function EditableInput({
  onSubmitValue,
  defaultValue,
  value,
  onChange,
  type,
  ...rest
}: EditableInputProps) {
  const isControlled = value !== undefined;

  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [internalValue, setInternalValue] = React.useState(
    defaultValue?.toString() ?? ""
  );
  const [initialValue, setInitialValue] = React.useState(internalValue);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const currentValue = isControlled ? value!.toString() : internalValue;
  const isEmpty = !currentValue || currentValue === "";

  const submitIfChanged = React.useCallback(() => {
    setIsReadOnly(true);

    if (currentValue !== initialValue) {
      onSubmitValue?.(currentValue);
    }
  }, [currentValue, initialValue, onSubmitValue]);

  const cancelEdit = () => {
    setIsReadOnly(true);
    if (!isControlled) {
      setInternalValue(initialValue);
    }
  };

  // Focus & select when entering edit mode
  React.useEffect(() => {
    if (!isReadOnly) {
      setInitialValue(currentValue);
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isReadOnly]);

  // Click outside → submit if changed
  React.useEffect(() => {
    if (isReadOnly) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!inputRef.current?.contains(e.target as Node)) {
        submitIfChanged();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isReadOnly]);

  return (
    <Input
      {...rest}
      ref={inputRef}
      readOnly={isReadOnly}
      value={currentValue}
      /** Used to hide default placeholders */
      type={isEmpty && isReadOnly ? "text" : type}
      onClick={() => setIsReadOnly(false)}
      onChange={(e) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          submitIfChanged();
          inputRef.current?.blur();
        }

        if (e.key === "Escape") {
          cancelEdit();
          inputRef.current?.blur();
        }
      }}
      onBlur={() => {
        submitIfChanged();
      }}
    />
  );
}
