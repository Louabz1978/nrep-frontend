import { Toaster } from "sonner";

function SonnerToast() {
  return (
    <Toaster
      position={"bottom-right"}
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!bg-background !border !border-solid !border-border !text-primary",
          closeButton:
            "!bg-background !border !border-solid !border-border !text-primary",
        },
      }}
    />
  );
}

export default SonnerToast;
