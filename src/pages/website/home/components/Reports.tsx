import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const searches = [
  { name: "تقييم حركة السوق", link: "/reports/market-movement" },
  { name: "أفضل عشرة وكلاء", link: "/reports/top-agent" },
];
const Reports = () => {
  const navigate = useNavigate();

  return (
    <div>
      <SectionTitle>التقارير</SectionTitle>
      <div className="min-h-[350px] flex-1 bg-[var(--card-bg)] rounded shadow-[var(--shadow-card)] p-[var(--spacing-xl)] flex flex-col gap-5">
        {searches.map((item, idx) => (
          <p
            onClick={() => navigate(item.link)}
            key={idx}
            className="cursor-pointer  text-lg  font-normal flex items-center gap-3 underline text-[var(--tertiary)] hover:text-primary"
          >
            {item.name} <GoLinkExternal />
          </p>
        ))}
      </div>
    </div>
  );
};
export default Reports;
