import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/cn";

/**
 * TooltipProvider component
 * Wraps the tooltip ecosystem and provides shared context
 *
 * @param {number} [delayDuration=0] - Delay before showing/hiding tooltip (ms)
 * @param {React.ComponentProps<typeof TooltipPrimitive.Provider>} props - All Radix Tooltip.Provider props
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider" // Data attribute for styling/selection
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Root Tooltip component
 * Manages the tooltip state and positioning
 *
 * @param {React.ComponentProps<typeof TooltipPrimitive.Root>} props - All Radix Tooltip.Root props
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * TooltipTrigger component
 * The element that triggers the tooltip on hover/focus
 *
 * @param {React.ComponentProps<typeof TooltipPrimitive.Trigger>} props - All Radix Tooltip.Trigger props
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/**
 * TooltipContent component
 * The actual tooltip content that appears
 *
 * @param {string} [className] - Additional className for custom styling
 * @param {number} [sideOffset=0] - Offset from the trigger element
 * @param {React.ReactNode} children - Tooltip content
 * @param {React.ComponentProps<typeof TooltipPrimitive.Content>} props - All Radix Tooltip.Content props
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          // Base styles
          "bg-quaternary-bg !text-size16 text-inverse-fg",
          // Animation styles
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          // Positioning animations
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          // Layout styles
          "z-[30] w-fit origin-(--radix-tooltip-content-transform-origin)",
          "rounded-[8px] px-3 py-1.5 text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-quaternary-bg fill-quaternary-bg z-[30] size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
