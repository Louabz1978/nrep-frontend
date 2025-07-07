import { Link } from "react-router-dom";
import { CiFileOn } from "react-icons/ci";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import PageContainer from "@/components/global/pageContainer/PageContainer";

// input page
function Input() {
  return (
    <PageContainer>
      <div className="mx-auto my-0">
        {/* buttons container */}
        <div className="flex gap-4 mt-8">
          {/* blank form button */}
          <Link to="/listing/add">
            <button
              className="group flex items-center justify-between gap-4 px-6 py-3 text-2xl font-bold text-white rounded-full bg-[var(--second-background)] transition-colors duration-300 hover:bg-[(--primary)] focus:outline-none  cursor-pointer "
              onMouseOver={e => (e.currentTarget.style.background = 'var(--primary)')}
              onMouseOut={e => (e.currentTarget.style.background = 'var(--second-background)')}
            >
              <div className="flex items-center justify-between">
                <span>إدخال جديد (نموذج فارغ)</span>
                <span className="mr-6 ml-6 bg-white text-[var(--primary)] w-8 h-8 flex items-center justify-center rounded-2xl">
                  <CiFileOn />
                </span>
              </div>
            </button>
          </Link>

          {/* fill from other button */}
          <Link to="/listing/import-other">
            <button
              className="group flex items-center justify-between gap-4 px-6 py-3 text-2xl font-bold text-white rounded-full bg-[var(--second-background)] transition-colors duration-300 hover:bg-[(--primary)] focus:outline-none  cursor-pointer "
              onMouseOver={e => (e.currentTarget.style.background = 'var(--primary)')}
              onMouseOut={e => (e.currentTarget.style.background = 'var(--second-background)')}
            >
              <div className="flex items-center justify-between">
                <span>استيراد من سجل عقارات آخر</span>
                <span className="mr-6 ml-6 bg-white text-[var(--primary)] w-8 h-8 flex items-center justify-center rounded-2xl">
                  <MdOutlineRealEstateAgent />
                </span>
              </div>
            </button>
          </Link>

          {/* fill from previouse tax button */}
          <Link to="/listing/import-previous">
            <button
              className="group flex items-center justify-between gap-4 px-6 py-3 text-2xl font-bold text-white rounded-full bg-[var(--second-background)] transition-colors duration-300 hover:bg-[(--primary)] focus:outline-none  cursor-pointer "
              onMouseOver={e => (e.currentTarget.style.background = 'var(--primary)')}
              onMouseOut={e => (e.currentTarget.style.background = 'var(--second-background)')}            >
              <span>استيراد من عقار سابق</span>
              <span className="mr-6 ml-6 flex items-center justify-center w-8 h-8 bg-white text-[var(--primary)] rounded-2xl transition-colors duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                <TbBuildingEstate />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default Input;
