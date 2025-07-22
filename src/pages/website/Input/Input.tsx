import { CiFileOn } from "react-icons/ci";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import InputPageButton from "./InputPageButton";
import PageContainer from "@/components/global/pageContainer/PageContainer";

// input page
function Input() {
  return (
    <AnimateContainer>
      <PageContainer>
        {/* buttons container */}
        <div className="flex lg:flex-row flex-col w-full lg:gap-4xl gap-xl xl:px-7xl lg:px-4xl">
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
    </AnimateContainer>
  );
}

export default Input;
