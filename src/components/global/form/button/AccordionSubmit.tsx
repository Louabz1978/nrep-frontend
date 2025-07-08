import { Button } from "./Button";
import type { FieldValues, Path, UseFormTrigger } from "react-hook-form";

interface AccordionSubmitProps<T extends FieldValues> {
  trigger: UseFormTrigger<T>;
  onValid: () => void;
  validationArray: Path<T>[];
}
function AccordionSubmit<T extends FieldValues>({
  trigger,
  onValid,
  validationArray,
}: AccordionSubmitProps<T>) {
  return (
    <Button
      className="!bg-success"
      onClick={async (e) => {
        e.preventDefault();
        const isValid = await trigger(validationArray, {
          shouldFocus: true,
        });
        if (isValid) onValid?.();
      }}
    >
      تأكيد البيانات
    </Button>
  );
}

export default AccordionSubmit;
