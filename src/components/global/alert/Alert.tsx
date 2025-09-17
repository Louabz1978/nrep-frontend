import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AlertCircle } from "lucide-react";

interface AlertDialogProps {
  open: boolean;
  title: string;
  description: string;
  cancelText?: string;
  continueText?: string;
  onCancel: () => void;
  onContinue: (data?: string[] | string) => void;
  data?: string[] | string;
}

export function ConfirmationAlert({
  open,
  title,
  description,
  cancelText = "إلغاء",
  continueText = "تأكيد",
  onCancel,
  onContinue,
  data,
}: AlertDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        dir="rtl"
        style={{ direction: "rtl" }}
        className="z-[1300] max-w-[90vw] !p-0 !rounded-[12px] overflow-hidden !gap-0 !border-none"
      >
        <AlertDialogHeader className="bg-primary p-[24px] pb-[24px] text-inverse-fg">
          <div className="flex items-center gap-[20px]">
            {/* icon */}
            <AlertCircle className="size-[56px] min-w-[56px]" />

            {/* messages */}
            <div className="flex flex-col justify-center items-start">
              <AlertDialogTitle className="md:!text-size22 !text-size18 !text-start !font-normal">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="md:!text-size15 !text-size13 !text-start !font-light !text-inverse-fg !opacity-70">
                {description}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="!flex !flex-row !items-center p-[24px] pb-[18px] !pt-[18px] !gap-[6px] !bg-card !justify-center">
          <AlertDialogAction
            className="!w-[106px]"
            onClick={(e) => {
              e.stopPropagation();
              onContinue?.(data);
            }}
          >
            {continueText}
          </AlertDialogAction>
          <AlertDialogCancel
            className="!w-[106px]"
            onClick={(e) => {
              e.stopPropagation();
              onCancel?.();
            }}
          >
            {cancelText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
