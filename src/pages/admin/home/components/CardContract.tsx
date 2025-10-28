import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const searches = [
  { name: "الوسيط العقاري", link: "realtors" },
  { name: "صاحب الشركة العقارية", link: "brokers" },
  { name: "الشركات العقارية", link: "agencies" },
  { name: "مدن / أحياء", link: "cities" },
];
const CardContract = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <SectionTitle contract={true}>الأساسيات</SectionTitle>
      </div>

      <div className="min-h-[350px] flex-1 bg-[var(--card-bg)] rounded shadow-[var(--shadow-card)] p-[var(--spacing-xl)] flex flex-col gap-5">
        {searches.map((item, idx) => (
          <p
            onClick={() => navigate(item.link)}
            key={idx}
            className="cursor-pointer  text-lg  font-normal flex items-center gap-3 underline  hover:text-primary text-[var(--tertiary)]"
          >
            {item.name} <GoLinkExternal />
          </p>
        ))}
      </div></div>
  );
};
export default CardContract;
