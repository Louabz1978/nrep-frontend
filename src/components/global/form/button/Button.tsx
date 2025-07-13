import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center gap-[10px] hover:brightness-[115%] justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:!cursor-not-allowed transition-all duration-[0.3s]",
  {
    variants: {
      variant: {
        default:
          "h-[40px] gap-[25px] py-[7.5px] px-[18.5px] rounded-full !text-inverse-fg bg-primary text-size24",
        "semi-round":
          "h-[45px] gap-[25px] py-[7.5px] px-[18.5px] rounded-[15.71px] !text-inverse-fg bg-primary text-size16",
        destructive:
          "font-medium !text-13p py-9p px-16p bg-destructive text-destructive-foreground hover:bg-destructive-hover rounded-xs border border-solid border-destructive hover:border-destructive-hover",
        outline:
          "h-[40px] border-[3.16px] border-primary rounded-[23.55px] !text-primary bg-transparent text-size24",
        "semi-round-outline":
          "h-[45px] border-[2.1px] border-primary rounded-[15.71px] !text-primary bg-transparent text-size16",
        secondary:
          "font-medium !text-13p py-9p px-16p bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-xs border border-solid border-secondary hover:border-secondary-hover",
        ghost:
          "font-medium !text-13p py-9p px-16p bg-transparent text-accent-hover hover:text-white hover:bg-accent-hover rounded-xs border border-solid border-transparent hover:border-accent-hover",
        link: "text-primary underline-offset-4 hover:underline",
        "ghost-light":
          "font-medium !text-13p py-9p px-16p bg-transparent text-foreground-secondary hover:bg-background-hover rounded-xs",
        panel:
          "font-medium !text-13p py-9p px-16p bg-top-panel-button text-top-panel-button-foreground hover:brightness-95 rounded-[7px]",
        radio:
          "w-[180px] h-[40px] rounded-full py-[13px] px-[30px] bg-quinary-bg text-inverse-fg",
      },

      size: {
        default: "",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        login: " rounded-[18px] h-[50px]",
        icon: "!p-0 flex justify-center items-center !size-[35px] rounded-[7px]",
        "icon-circle":
          "h-[32px] w-[32px] flex justify-center items-center rounded-full !p-0",
        "panel-icon": "h-[36px] w-[36px] flex justify-center interface !p-0",
      },
      status: {
        default: "",
        "active-radio": "!bg-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      status: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  status?: "default" | "active-radio";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        // className={"hover:brightness-95"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={(e) => {
          if (props.onClick) e.preventDefault();
          props.onClick?.(e);
        }}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
