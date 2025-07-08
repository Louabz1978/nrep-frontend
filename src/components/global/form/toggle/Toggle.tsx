import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

interface ToggleProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  onChange?: () => void;
}

function Toggle<T extends FieldValues>({
  form,
  name,
  onChange,
}: ToggleProps<T>) {
  return (
    <div
      onClick={() => {
        form.setValue(name, !form.watch(name) as PathValue<T, Path<T>>);
        onChange?.();
      }}
      className={`w-[49px] cursor-pointer flex h-[24px] rounded-full p-[3px] relative ${
        form.watch(name)
          ? "bg-primary justify-end"
          : "bg-tertiary-bg justify-start"
      } border border-tertiary-bg transition-all duration-[0.3s]`}
    >
      <div
        className={`h-full aspect-square rounded-full ${
          form.watch(name) ? " bg-tertiary-bg" : " bg-placeholder"
        } transition-all duration-[0.3s] `}
      ></div>
    </div>
  );
}

export default Toggle;
