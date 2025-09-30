import React from "react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="text-center text-[26px] font-bold text-[var(--card)] block  mb-10  ">
    {children}
  </span>
);

export default SectionTitle;
