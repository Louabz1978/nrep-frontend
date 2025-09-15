import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  Controller,
  useWatch,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

interface SignatureInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
}

function SignatureInput<T extends FieldValues>({
  form,
  name,
  label,
  required,
}: SignatureInputProps<T>) {
  const sigRef = useRef<SignatureCanvas>(null);
  const value = useWatch({ control: form.control, name: name });
  console.log({ value });

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-size18 font-medium text-primary-fg">
          {label}
          {required && <span className="text-error"> *</span>}
        </label>
      )}

      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <div className="h-[100px] w-[180px] relative">
            <div className="h-full w-full absolute top-0 right-0 pointer-events-none z-[-1] ">
              {value ? (
                <img src={value} className="size-full object-contain " />
              ) : null}
            </div>
            <SignatureCanvas
              ref={sigRef}
              penColor="black"
              backgroundColor="white"
              canvasProps={{
                className: "sigCanvas border  w-full h-[100px] ",
              }}
              onEnd={() => {
                if (sigRef.current?.isEmpty()) {
                  field.onChange("");
                } else {
                  const signatureData = sigRef.current?.toDataURL() ?? "";
                  field.onChange(signatureData);
                }
              }}
            />
          </div>
        )}
      />
    </div>
  );
}

export default SignatureInput;
