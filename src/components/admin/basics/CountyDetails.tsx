import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Input } from "@/components/global/ui/input";
import useGetCountyById from "@/hooks/admin/locations/useGetCountyById";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CountyTable from "./CountyTable";
import CityTable from "./CityTable";
import AreaTable from "./AreaTable";

const CountyDetails = () => {
  const { id } = useParams();
  const numberId = Number(id);

  const { countyDetails } = useGetCountyById(numberId);

  const [activeTab, setActiveTab] = useState("all");

  const TABS = [
    { key: "areas", label: "مناطق" },
    { key: "cities", label: "مدن" },
    { key: "all", label: "الكل" },
  ];

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="mb-4">
              <h1 className="text-size24 sm:text-size30 font-medius  text-center sm:text-right">
                {countyDetails?.county?.title}
              </h1>
              <p> هنا تعرض كل تفاصيل محافظة حمص </p>
            </div>
            <div className="mb-0">
              <Input
                placeholder="ابحث عن اسم الوسيط أو رقم الرخصة أو نوع العملية"
                type="search"
                variant="white"
                iconClassName="text-gray-400/50 h-[18px] w-[18px] "
                className="w-90 bg-white !h-2lg !text-size16 !border-gray-400 !rounded-[10px] placeholder:text-xs leading-tight py-sm px-md !text-sm "
              />
            </div>
          </div>
          <hr className="mt-2" />
        </div>
        {/* Tabs */}
        <div
          className="flex gap-5xl items-center justify-center my-5xl"
          style={{ direction: "ltr" }}
        >
          <div className="flex overflow-auto gap-5xl">
            {TABS.map((tab) => (
              <div className="flex items-center justify-center">
                <button
                  key={tab.key}
                  className={`flex items-center justify-around gap-3 px-6xl py-3 rounded-full font-medium cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-golden-medium text-layout-bg"
                      : "bg-layout-bg text-tertiary-bg"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <div>{tab.label}</div>
                </button>
              </div>
            ))}
          </div>
        </div>
        {activeTab === "all" ? (
          <CountyTable />
        ) : activeTab === "cities" ? (
          <CityTable />
        ) : (
          <AreaTable />
        )}
      </PageContainer>
    </AnimateContainer>
  );
};

export default CountyDetails;
