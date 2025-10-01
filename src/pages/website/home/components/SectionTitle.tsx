import React from "react";

type SectionTitleProps = { children: React.ReactNode; contract?: boolean };

const SectionTitle = ({ children, contract }: SectionTitleProps) => (
  <span className={`text-center text-[26px] font-bold text-[var(--card)] block mb-10 ${contract ? "mt-20 sm:mt-0" : ""}`}>
    {children}
  </span>
);

export default SectionTitle;
