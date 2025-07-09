import { type ReactNode } from "react";
import {
  type FieldErrors,
  type UseFormReturn,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { IoInformationCircleOutline } from "react-icons/io5";

interface TextareaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  placeholder?: string;
  name: Path<T>;
  label?: string;
  labelStyle?: string;
  disabled?: boolean;
  addingStyle?: string;
  addingTextareaStyle?: string;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  info?: string | ReactNode;
  addingValidStyle?: string;
}

function Textarea<T extends FieldValues>({
  form,
  placeholder,
  name,
  label,
  labelStyle,
  disabled,
  addingStyle = "",
  addingValidStyle = "",
  addingTextareaStyle = "",
  onClick = () => {},
  onFocus = () => {},
  onBlur = () => {},
  info,
}: TextareaProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;

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

  // helper function to check if field is valid
  function isValid<T extends FieldValues>(form: UseFormReturn<T>): boolean {
    const { formState } = form;

    return !!(formState.dirtyFields as Record<Path<T>, boolean>);
  }

  return (
    <>
      {/* other normal inputs */}
      <div
        className={`flex flex-col w-full gap-[4px] ${addingStyle}`}
        onClick={onClick}
      >
        {/* input label  */}
        {label ? (
          <label
            htmlFor={name}
            className={`text-size22 font-medium text-primary-fg cursor-pointer ${labelStyle}`}
          >
            {label}
          </label>
        ) : null}

        <div className="w-full flex flex-col gap-[4px]">
          {/* input container to link icon to its position */}
          <div className="relative flex items-center gap-[15px]">
            <div className="relative flex-1 flex items-center overflow-hidden">
              {/* input with react hook form register control  */}
              {
                <textarea
                  placeholder={placeholder}
                  id={name}
                  {...(register ? register(name) : {})}
                  disabled={disabled}
                  className={`flex-1 h-[166px] text-[16.36px] bg-input-bg p-[12.72px] border-[1.64px] text-primary-fg rounded-[13.92px] overflow-auto outline-none focus-visible:border-[3px] focus-visible:outline-none placeholder:text-placeholder transition-colors duration-[0.3s] ${
                    getError(errors, name)
                      ? "border-error"
                      : `${
                          isValid(form)
                            ? "focus-visible:border-success"
                            : "focus-visible:border-secondary"
                        } hover:border-secondary ${
                          addingValidStyle
                            ? addingValidStyle
                            : "border-secondary-border"
                        }`
                  }  ${addingTextareaStyle}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              }
            </div>

            {/* beside element */}
            {info ? (
              <IoInformationCircleOutline className="cursor-pointer text-primary-fg self-end size-[24px] min-w-[24px]" />
            ) : null}
          </div>

          {/* validation errors  */}
          {getError(errors, name) ? (
            <span className="text-error font-medium text-size16">
              {getError(errors, name)?.message}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Textarea;
