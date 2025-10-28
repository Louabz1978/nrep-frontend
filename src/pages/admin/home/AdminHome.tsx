import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import TopSection from "./components/Topsection";
import HomeReports from "./components/HomeReports";
import SearchCard from "./components/SearchCard";
import ActionQuickEntry from "./components/ActionQuickEntry";
import Reports from "./components/Reports";
import CardContract from "./components/CardContract";
import ApexScatterCard from "@/pages/admin/home/components/ApexScatterCard";
import RealtorScatterCard from "./components/RealtorScatterCard";

function AdminHome() {
  return (
    <>
      <TopSection />
      <div className="flex flex-col flex-1 overflow-auto md:p-container-padding-desktop p-container-padding-mobile bg-white lg:p-20   ">
        <AnimateContainer>
          <div className="min-h-screen space-y-8 text-center">
            <HomeReports />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
              <ApexScatterCard />
              <RealtorScatterCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
              <SearchCard />
              <ActionQuickEntry />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
              <Reports />
              <CardContract />
            </div>
          </div>
        </AnimateContainer>
      </div>
    </>
  );
}

export default AdminHome;