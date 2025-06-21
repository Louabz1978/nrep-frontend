import { Toaster } from "sonner";

function SonnerToast() {
  return (
    <Toaster
      position={"bottom-right"}
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!bg-primary !border !border-solid !border-border-primary !text-text-primary",
          closeButton:
            "!bg-primary !border !border-solid !border-border-primary !text-text-primary",
        },
      }}
    />
  );
}

export default SonnerToast;
