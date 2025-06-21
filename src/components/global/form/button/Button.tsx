import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-all duration-[0.3s]",
  {
    variants: {
      variant: {
        default:
          "font-medium !text-13p py-9p px-16p bg-primary text-primary-foreground hover:bg-primary-hover rounded-xs border border-solid border-primary hover:border-primary-hover",
        destructive:
          "font-medium !text-13p py-9p px-16p bg-destructive text-destructive-foreground hover:bg-destructive-hover rounded-xs border border-solid border-destructive hover:border-destructive-hover",
        outline:
          "font-medium !text-13p py-9p px-16p bg-transparent text-primary-hover hover:text-primary-foreground hover:bg-primary-hover rounded-xs border border-solid border-primary-hover",
        secondary:
          "font-medium !text-13p py-9p px-16p bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-xs border border-solid border-secondary hover:border-secondary-hover",
        ghost:
          "font-medium !text-13p py-9p px-16p bg-transparent text-accent-hover hover:text-white hover:bg-accent-hover rounded-xs border border-solid border-transparent hover:border-accent-hover",
        link: "text-primary underline-offset-4 hover:underline",
        "ghost-light":
          "font-medium !text-13p py-9p px-16p bg-transparent text-foreground-secondary hover:bg-background-hover rounded-xs",
        panel:
          "font-medium !text-13p py-9p px-16p bg-top-panel-button text-top-panel-button-foreground hover:brightness-95 rounded-[7px]",
      },
      size: {
        default: "h-9 px-6 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 flex justify-center items-center !p-0",
        "icon-circle":
          "h-[32px] w-[32px] flex justify-center items-center rounded-full !p-0",
        "panel-icon": "h-[36px] w-[36px] flex justifyContent interface !p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
