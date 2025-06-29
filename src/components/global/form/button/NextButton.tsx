import React from "react";

/**
 * Reusable Next button for form steps.
 * Uses Tailwind CSS classes for styling. If you use CSS variables, replace the className with style={{ background: "var(--primary-color)" }}.
 */

const NextButton = ({ onClick, disabled, children = "Next" }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 rounded bg-primary text-white disabled:opacity-50"
  >
    {children}
  </button>
);

export default NextButton; 