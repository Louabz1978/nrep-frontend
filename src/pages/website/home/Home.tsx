import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import NewsNotificationsCard from "@/pages/website/home/components/NewsNotificationsCard";
import SearchCard from "@/pages/website/home/components/SearchCard";
import ExternalLinksCard from "@/pages/website/home/components/ExternalLinksCard";
import HomeReports from "@/pages/website/home/components/HomeReports";
import ActionQuickEntry from "@/pages/website/home/components/ActionQuickEntry";
import HeroSection from "@/pages/website/home/components/HeroSection";
import CardContract from "./components/CardContract";
import Reports from "./components/Reports";
function Home() {
  return (
    <>
      <HeroSection />
      <div className="flex flex-col flex-1 overflow-auto md:p-container-padding-desktop p-container-padding-mobile bg-white lg:p-20   ">
        <AnimateContainer>
          <div className="min-h-screen space-y-8 text-center    ">
            <HomeReports />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
              <div className="flex flex-col gap-12">
                <SearchCard />
                <ActionQuickEntry />
              </div>
              <NewsNotificationsCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-[var(--tertiary)]">
              <CardContract />
              <ExternalLinksCard />
              <Reports />
            </div>
          </div>
        </AnimateContainer>
      </div>
    </>
  );
}

export default Home;
