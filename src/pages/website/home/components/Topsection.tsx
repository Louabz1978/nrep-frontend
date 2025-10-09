import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/images/f8f1ae60a65a9d5efa06ccfd6099602470a0b0a2.jpg";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";

function Topsection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`listing/all-listings?allListings_mls_num=${search.trim()}`);
    }
  };

  return (
    <div className="relative z-1 w-full h-[420px] bg-white overflow-hidden shadow-primary-shadow">
      <img
        src={heroImg}
        alt="المنصة الوطنية للعقارات"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute size-full z-0 bg-black/35" />

      <div className="relative z-10 h-full flex items-center justify-center p-4">
        <div className="w-full text-center">
          <FormSectionHeader
            style={{
              textShadow: "0px 4px 4px #ffffff80",
            }}
            className="!text-inverse-fg"
          >
            المنصة الوطنية للعقارات
          </FormSectionHeader>
          <FormSectionHeader
            style={{
              textShadow: "0px 4px 4px #ffffff80",
            }}
            className="!text-inverse-fg"
          >
            حمص
          </FormSectionHeader>
          <div className="flex justify-center mt-6">
            <div className="relative lg:w-[552px] md:w-[350px] w-[300px]">
              <input
                type="number"
                id="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e?.target?.value)}
                placeholder="البحث عبر MLS"
                className="h-[48px] w-full text-primary-fg bg-tertiary-bg text-size16 placeholder:text-size16 placeholder:text-placeholder-secondary rounded-full px-xl py-sm pl-4xl text-primary-foreground focus:outline-none pr-12"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    handleSearch();
                  }
                }}
              />
              {/* Search icon (clickable) */}
              <span
                className="absolute inset-y-0 right-4 flex items-center text-primary-icon text-lg cursor-pointer"
                onClick={handleSearch}
                tabIndex={0}
                role="button"
                aria-label="بحث"
              >
                <FaSearch />
              </span>
              {/* Clear icon */}
              <span
                className={`absolute inset-y-0 h-full group left-3 flex items-center justify-center cursor-pointer ${
                  search ? "block" : "hidden"
                }`}
                onClick={() => setSearch("")}
              >
                <AiOutlineClose className="size-[12px] text-primary-icon group-hover:text-primary-fg transition-all" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topsection;
