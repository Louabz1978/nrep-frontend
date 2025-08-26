import { GoLinkExternal } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const searches = [
  { name: "الحساب الشخصي", link: "/profile" },
  { name: "إضافة عقار", link: "/listing/add" },
  { name: "كل العقارات", link: "listing/all-listings" },
  { name: "عقاراتي", link: "listing/my-listings" },
  { name: "عقود البيع و الشراء و الإيجار", link: "/" },
  { name: "التواصل مع مجلس الوسطاء العقاريين في حمص", link: "/" },
  {name:"كتابة عقد بيع/شراء/ايجار",link:"contracts"},
  {name:"تعديل عقد ",link:"contracts/edit"}
];
const RelatedLinks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[380px] bg-tertiary-bg rounded-[var(--spacing-2xl)] shadow-primary-shadow p-[var(--spacing-xl)] flex flex-col justify-between">
      <h2 className="text-size24 font-semibold text-right mb-[var(--spacing-lg)] text-secondary-fg">
        روابط ذات صلة
      </h2>
      {searches.map((item, idx) => (
        <p
          onClick={() => navigate(item.link)}
          key={idx}
          className="cursor-pointer text-right text-lg  font-normal flex items-center gap-3 underline text-sky hover:text-primary"
        >
          {item.name} <GoLinkExternal />
        </p>
      ))}
    </div>
  );
};
export default RelatedLinks;
