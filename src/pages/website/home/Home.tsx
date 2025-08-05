import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import NewsNotificationsCard from "@/pages/website/home/components/NewsNotificationsCard";
import MarketMonitorCard from "./components/MarketMonitorCard";
import SearchCard from "@/pages/website/home/components/SearchCard";
import ExternalLinksCard from "@/pages/website/home/components/ExternalLinksCard";
import RelatedLinks from "@/pages/website/home/components/RelatedLinks";

function Home() {
  return (
    <AnimateContainer>
        <div className="min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* First four components in two columns (2 in each column) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <SearchCard />
                <RelatedLinks />
              </div>
              <div className="flex flex-col gap-6">
                <MarketMonitorCard />
                <ExternalLinksCard />
              </div>
            </div>
            {/* Last component in its own column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <NewsNotificationsCard />
            </div>
          </div>
        </div>
    </AnimateContainer>
  );
}

export default Home;
