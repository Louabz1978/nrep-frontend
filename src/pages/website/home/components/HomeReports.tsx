import SectionTitle from "./SectionTitle.tsx";
import TopAgentsColumn from "./TopAgentsColumn.tsx";
import MarketStatusPie from "./MarketStatusPie.tsx";

const HomeReports = () => {
  return (
    <div className="text-center">
      <SectionTitle>احصائيات وتقارير</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <MarketStatusPie />
        </div>
        <div className="lg:col-span-8">
          <TopAgentsColumn />
        </div>
      </div>
    </div>
  );
};

export default HomeReports;