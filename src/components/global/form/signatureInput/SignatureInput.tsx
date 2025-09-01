import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Controller, type FieldValues, type Path, type UseFormReturn } from "react-hook-form";
import { Button } from "../button/Button";

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

  const clearSignature = () => {
    sigRef.current?.clear();
    form.setValue(name, "");
    form.trigger(name);
  };

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
          <>
            <SignatureCanvas
              ref={sigRef}
              penColor="black"
              backgroundColor="white"
              canvasProps={{
                className:
                  "sigCanvas border rounded-lg w-full h-[200px] w-[200px]",
              }}
              onEnd={() => {
                const signatureData = sigRef.current?.toDataURL() ?? "";
                field.onChange(signatureData);
              }}
            />
            <div className="mt-2 flex justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={clearSignature}
              >
                Clear
              </Button>
            </div>
          </>
        )}
      />
    </div>
  );
}

export default SignatureInput;
