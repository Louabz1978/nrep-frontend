import type {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";

/**
 * Gets the error for a nested field path
 * @param errors - The form errors object
 * @param name - The dot-separated field path (e.g. "user.address.street")
 * @returns The field error if exists, false otherwise
 */
function getError<T extends FieldValues>(
  errors: FieldErrors<T> | undefined,
  name: Path<T>
): FieldError | false {
  if (!errors || !name) return false;

  const names = name.split(".");
  let current: unknown = errors;

  for (const subName of names) {
    if (!current || typeof current !== "object") return false;

    // Type guard to check if we're at a FieldError
    if ("message" in (current as object)) {
      return current as FieldError;
    }

    // Safely access the next level
    current = (current as Record<string, unknown>)[subName];
  }

  // Final check if we ended on a FieldError
  return current && typeof current === "object" && "message" in current
    ? (current as FieldError)
    : false;
}

/**
 * Checks if the form has any valid (dirty) fields
 * @param form - The react-hook-form instance
 * @returns Boolean indicating if form has valid fields
 */
export function isValid<T extends FieldValues>(
  form: UseFormReturn<T>
): boolean {
  return Object.keys(form.formState.dirtyFields).length > 0;
}

export default getError;
