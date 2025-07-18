import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

interface ToggleProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  onChange?: () => void;
}

function Toggle<T extends FieldValues>({
  form,
  name,
  label,
  onChange,
}: ToggleProps<T>) {
  return (
    <label className="flex items-center gap-4 cursor-pointer select-none">
      <div
        onClick={(e) => {
          e.preventDefault();
          form.setValue(name, !form.watch(name) as PathValue<T, Path<T>>);
          onChange?.();
        }}
        className={`w-[49px] flex h-[24px] rounded-full p-[3px] relative ${
          form.watch(name)
            ? "bg-primary justify-end"
            : "bg-tertiary-bg justify-start"
        } border border-tertiary-bg transition-all duration-[0.3s]`}
        tabIndex={0}
        role="switch"
        aria-checked={!!form.watch(name)}
      >
        <div
          className={`h-full aspect-square rounded-full ${
            form.watch(name) ? " bg-tertiary-bg" : " bg-placeholder"
          } transition-all duration-[0.3s] `}
        ></div>
      </div>
      <span className="text-base">{label}</span>
    </label>
  );
}

export default Toggle;
