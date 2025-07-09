import { CiFileOn } from "react-icons/ci";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import InputPageButton from "./InputPageButton";

// input page
function Input() {
  return (
    <PageContainer>
      {/* buttons container */}
      <div className="flex w-full gap-[32px] px-[88px] mt-8">
        {/* blank form button */}
        <InputPageButton
          to="/listing/add"
          icon={CiFileOn}
          title="إدخال جديد (نموذج فارغ)"
        />

        {/* fill from other button */}
        <InputPageButton
          to="/listing/import-other"
          icon={MdOutlineRealEstateAgent}
          title="استيراد من سجل عقارات آخر"
        />

        {/* fill from previouse tax button */}
        <InputPageButton
          to="/listing/import-previous"
          icon={TbBuildingEstate}
          title="استيراد من عقار سابق"
        />
      </div>
    </PageContainer>
  );
}

export default Input;
