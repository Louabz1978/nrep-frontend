import { useState, useRef, useEffect, useCallback } from "react";
import type {
  UseFormReturn,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import Info from "../../modal/Info";
import getError from "@/utils/getErrors";
import type { ReactNode } from "react";

interface RangeProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  labelStyle?: string;
  disabled?: boolean;
  addingStyle?: string;
  info?: string | ReactNode;
  required?: boolean;
  valueFormatter?: (value: number) => string;
  onChange?: (values: { min: number; max: number }) => void;
}

function Range<T extends FieldValues>({
  form,
  name,
  min = 0,
  max = 100,
  step = 1,
  label,
  labelStyle,
  disabled = false,
  addingStyle = "",
  info,
  required = false,
  valueFormatter,
  onChange,
}: RangeProps<T>) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const [hoveredThumb, setHoveredThumb] = useState<"min" | "max" | null>(null);

  // Get current values from form
  const currentValue = watch(name) as { min: number; max: number } | undefined;
  const minValue = currentValue?.min ?? min;
  const maxValue = currentValue?.max ?? max;

  // Calculate percentages (clamp to 0-100 to prevent overflow)
  const minPercent = Math.max(
    0,
    Math.min(100, ((minValue - min) / (max - min)) * 100)
  );
  const maxPercent = Math.max(
    0,
    Math.min(100, ((maxValue - min) / (max - min)) * 100)
  );

  // Format value for display
  const formatValue = useCallback(
    (value: number) => {
      if (valueFormatter) {
        return valueFormatter(value);
      }
      return value.toString();
    },
    [valueFormatter]
  );

  // Convert pixel position to value
  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return min;
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const value = min + percentage * (max - min);
      return Math.round(value / step) * step;
    },
    [min, max, step]
  );

  // Handle mouse/touch move
  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || disabled) return;

      const newValue = getValueFromPosition(clientX);

      if (isDragging === "min") {
        const newMin = Math.max(min, Math.min(newValue, maxValue - step));
        setValue(
          name,
          { min: newMin, max: maxValue } as PathValue<T, Path<T>>,
          {
            shouldValidate: true,
          }
        );
        onChange?.({ min: newMin, max: maxValue });
      } else if (isDragging === "max") {
        const newMax = Math.min(max, Math.max(newValue, minValue + step));
        setValue(
          name,
          { min: minValue, max: newMax } as PathValue<T, Path<T>>,
          {
            shouldValidate: true,
          }
        );
        onChange?.({ min: minValue, max: newMax });
      }
    },
    [
      isDragging,
      disabled,
      getValueFromPosition,
      min,
      max,
      step,
      minValue,
      maxValue,
      setValue,
      name,
      onChange,
    ]
  );

  // Mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  // Touch events
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMove]);

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isDragging) return;

    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickPercent = (clickX / rect.width) * 100;
    const newValue = getValueFromPosition(e.clientX);

    // Determine which thumb is closer
    const distanceToMin = Math.abs(clickPercent - minPercent);
    const distanceToMax = Math.abs(clickPercent - maxPercent);

    if (distanceToMin < distanceToMax) {
      // Move min thumb
      const newMin = Math.max(min, Math.min(newValue, maxValue - step));
      setValue(name, { min: newMin, max: maxValue } as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
      onChange?.({ min: newMin, max: maxValue });
    } else {
      // Move max thumb
      const newMax = Math.min(max, Math.max(newValue, minValue + step));
      setValue(name, { min: minValue, max: newMax } as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
      onChange?.({ min: minValue, max: newMax });
    }
  };

  // Initialize form value if not set
  useEffect(() => {
    if (!currentValue) {
      setValue(name, { min, max } as PathValue<T, Path<T>>, {
        shouldValidate: false,
      });
    }
  }, [currentValue, min, max, name, setValue]);


  return (
    <div className={`flex flex-col w-full gap-[4px] ${addingStyle}`}>
      {/* Label */}
      {label ? (
        <label
          htmlFor={name}
          className={`text-size18 font-medium text-primary-fg cursor-pointer ${labelStyle}`}
        >
          <div className="flex items-center gap-sm">
            {label}
            {required ? <span className="text-error">*</span> : null}
          </div>
        </label>
      ) : null}

      <div className="w-full flex flex-col gap-xs">
        <div className="relative flex items-center gap-lg">
          {/* Slider Container */}
          <div className="relative flex-1 flex items-center">
            <div
              ref={sliderRef}
              className="relative w-full h-8 flex items-center cursor-pointer"
              onClick={handleTrackClick}
            >
              {/* Track Background (Inactive) */}
              <div className="absolute w-full h-1.5 bg-secondary-border rounded-full" />

              {/* Active Range (with gradient) */}
              <div
                className="absolute h-1.5 rounded-full transition-all duration-150"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                  background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
                }}
              />

              {/* Min Thumb */}
              <div
                className="absolute z-10 w-5 h-5 bg-white border-3 border-secondary-border rounded-full cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                style={{
                  left: `calc(${minPercent}% - 10px)`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  if (!disabled) setIsDragging("min");
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  if (!disabled) setIsDragging("min");
                }}
                onMouseEnter={() => setHoveredThumb("min")}
                onMouseLeave={() => {
                  if (!isDragging) setHoveredThumb(null);
                }}
              >
                {/* Min Value Tooltip */}
                {(isDragging === "min" || hoveredThumb === "min") && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2xl rounded-4xl bg-primary text-white text-size14  whitespace-nowrap pointer-events-none z-20">
                    {formatValue(minValue)}
                    {/* Tooltip Arrow */}
                    <div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: "4px solid transparent",
                        borderRight: "4px solid transparent",
                        borderTop: "4px solid var(--primary)",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Max Thumb */}
              <div
                className="absolute z-10 w-5 h-5 bg-white border-3 border-secondary-border  rounded-full cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                style={{
                  left: `calc(${maxPercent}% - 10px)`,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  if (!disabled) setIsDragging("max");
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  if (!disabled) setIsDragging("max");
                }}
                onMouseEnter={() => setHoveredThumb("max")}
                onMouseLeave={() => {
                  if (!isDragging) setHoveredThumb(null);
                }}
              >
                {/* Max Value Tooltip */}
                {(isDragging === "max" || hoveredThumb === "max") && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2xl rounded-4xl bg-primary text-white text-size14  whitespace-nowrap pointer-events-none z-20">
                    {formatValue(maxValue)}
                    {/* Tooltip Arrow */}
                    <div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: "4px solid transparent",
                        borderRight: "4px solid transparent",
                        borderTop: "4px solid var(--primary)",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Icon */}
          {info ? <Info info={info} /> : null}
        </div>

        {/* Validation Error */}
        {getError(errors, name) ? (
          <span className="text-error font-medium text-size14">
            {(getError(errors, name) as { message: string })?.message}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default Range;
