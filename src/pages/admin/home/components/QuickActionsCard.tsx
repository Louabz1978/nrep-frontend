import { useNavigate } from "react-router-dom";

const actions = [
  { label: "إدخال عقار", link: "/listing/add" },
  { label: "كل العقارات", link: "listing/all-listings" },
  { label: "عقاراتي", link: "listing/my-listings" },
];

const QuickActionsCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-tertiary-bg rounded-[var(--spacing-2xl)] shadow-primary-shadow p-[var(--spacing-xl)] min-h-[180px] flex flex-col gap-3">
      <h2 className="text-size24 font-semibold text-right mb-[var(--spacing-sm)] text-secondary-fg">
        العقارات
      </h2>
      <div className="flex flex-col gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.link)}
            className="text-right text-primary hover:text-digital-green-bg underline"
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;


