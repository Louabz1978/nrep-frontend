interface ValueCardProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

function ValueCard({
  label,
  value,
  unit,
  className = "",
  labelClassName = "",
  valueClassName = "",
}: ValueCardProps) {
  // Parse value and unit
  let numericValue: string;
  let displayUnit: string;

  if (unit) {
    // If unit is explicitly provided, use it
    numericValue =
      typeof value === "number" ? value.toString() : value.toString();
    displayUnit = unit;
  } else if (typeof value === "string") {
    // Try to extract unit from string (e.g., "200 m²" -> "200" and "m²")
    const unitMatch = value.match(/[\s]?([a-zA-Z²³°°µ]+)$/);
    if (unitMatch) {
      numericValue = value.replace(/[\s]?[a-zA-Z²³°°µ]+$/, "").trim();
      displayUnit = unitMatch[1];
    } else {
      // No unit found, use the whole string as value
      numericValue = value;
      displayUnit = "";
    }
  } else {
    // Number without unit
    numericValue = value.toString();
    displayUnit = "";
  }

  return (
    <div
      className={`bg-card-bg border border-golden-bold rounded-lg !w-100 p-sm flex flex-col items-end ${className}`}
    >
      {/* Label */}
      <div
        className={`text-size14 text-golden-bold font-normal ${labelClassName}`}
      >
        {label}
      </div>

      {/* Value */}
      <div className={`flex items-baseline gap-1 ${valueClassName}`}>
        {displayUnit && (
          <span className="text-size20 text-golden-bold ">
            {displayUnit}
          </span>
        )}
        <span className="text-size20 text-golden-bold">
          {numericValue}
        </span>
      </div>
    </div>
  );
}

export default ValueCard;
