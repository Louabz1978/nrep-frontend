import { Link } from 'react-router-dom';
import { CiFileOn } from "react-icons/ci";
import { MdOutlineRealEstateAgent } from 'react-icons/md';
import { TbBuildingEstate } from 'react-icons/tb';

function Input() {
  return (
    <div className="mx-auto my-0">
      <div className="flex gap-4 mt-8">
        <Link to="/listing/add">
          <button
            className="bg-[#1C2026] text-2xl hover:bg-[#D4AF37] text-white font-bold py-3 px-6 rounded-full  flex items-center gap-2 transition-colors duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span>إدخال جديد (نموذج فارغ)</span>
              <span className="mr-2 bg-white text-[#D4AF37] w-8 h-8 flex items-center justify-center rounded-2xl">
                <CiFileOn />
              </span>
            </div>
          </button>
        </Link>
        <Link to="/listing/import-other">
          <button
            className="bg-[#1C2026] text-2xl hover:bg-[#D4AF37] text-white font-bold py-3 px-6 rounded-full  flex items-center gap-2 transition-colors duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span>استيراد من سجل عقارات آخر</span>
              <span className="mr-2 bg-white text-[#D4AF37] w-8 h-8 flex items-center justify-center rounded-2xl">
              <MdOutlineRealEstateAgent />

              </span>
            </div>
          </button>
        </Link>
        <Link to="/listing/import-previous">
          <button
            className="bg-[#1C2026] text-2xl hover:bg-[#D4AF37] text-white font-bold py-3 px-6 rounded-full  flex items-center gap-2 transition-colors duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span>استيراد من عقار سابق</span>
              <span className="mr-2 bg-white text-[#D4AF37] w-8 h-8 flex items-center justify-center rounded-2xl">
              <TbBuildingEstate />
              </span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Input;