import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";

function getError(errors: FieldErrors | undefined, name: string): any {
  let res: any = false;
  let currentErrors: any = errors;
  const names = name?.split(".");
  names?.map((subName) => {
    res = currentErrors?.[subName];
    currentErrors = currentErrors?.[subName];
  });
  return res;
}

export default getError;

// helper function to check if field is valid
export function isValid<T extends FieldValues>(
  form: UseFormReturn<T>
): boolean {
  const { formState } = form;

  return !!(formState.dirtyFields as Record<Path<T>, boolean>);
}
