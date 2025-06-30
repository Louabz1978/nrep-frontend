import Accrodion from "@/components/global/accrodion/Accrodion";
import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdRealEstateAgent } from "react-icons/md";

function GeneralStep() {
  // State for each accordion section
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenThird, setIsOpenThird] = useState(false);

  // Toggle handlers for each accordion
  const toggleStateFirst = () => setIsOpenFirst((prev) => !prev);
  const toggleStateSecond = () => setIsOpenSecond((prev) => !prev);
  const toggleStateThird = () => setIsOpenThird((prev) => !prev);

  return (
    <div>
      {/* Accordion for general property information */}
      <Accrodion
        onClick={toggleStateFirst}
        title="معلومات عامة عن العقار"
        icon={<MdRealEstateAgent />}
        isOpen={isOpenFirst}
      >
        <div>
          hello hi
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
        </div>
      </Accrodion>
      {/* Accordion for property category */}
      <Accrodion
        onClick={toggleStateSecond}
        title="فئة العقار : سكني"
        icon={<HiOutlineBuildingOffice2 />}
        isOpen={isOpenSecond}
      >
        <div>
          hello hi
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
        </div>
      </Accrodion>
      {/* Accordion for geographic data and documents */}
      <Accrodion
        onClick={toggleStateThird}
        title="البيانات الجغرافية و المستندات"
        icon={<FiMapPin />}
        isOpen={isOpenThird}
      >
        <div>
          hello hi
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
          <div>bro</div>
        </div>
      </Accrodion>
    </div>
  );
}

export default GeneralStep;
