import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import Info from "../../modal/Info";

interface ToggleProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  onChange?: () => void;
  info?: string | React.ReactNode;
}

function Toggle<T extends FieldValues>({
  form,
  name,
  label,
  onChange,
  info,
}: ToggleProps<T>) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer select-none flex-row">
      <span className="text-base">{label}</span>
      <div className="flex items-center gap-5">
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
      <div>{info ? <Info info={info} /> : null}</div>
      </div>
    </label>
  );
}

export default Toggle;
