import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import NewsNotificationsCard from "@/pages/website/home/components/NewsNotificationsCard";
import MarketMonitorCard from "./components/MarketMonitorCard";
import SearchCard from "@/pages/website/home/components/SearchCard";
import ExternalLinksCard from "@/pages/website/home/components/ExternalLinksCard";
import FavoriteSearchesCard from "@/pages/website/home/components/FavoriteSearchesCard";

function Home() {
  return (
    <AnimateContainer>
      <PageContainer>
        <div className="min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main content: 8/12 columns */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* First row: Search (6/8), Market (2/8) */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-3">
                  <SearchCard />
                </div>
                <div className="md:col-span-2 grid">
                  <MarketMonitorCard />
                </div>
              </div>
              {/* Second row: Favorites (3/8), External (5/8) */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-2">
                  <FavoriteSearchesCard />
                </div>
                <div className=" md:col-span-3">
                  <ExternalLinksCard />
                </div>
              </div>
            </div>
            {/* News: 4/12 columns, fills vertical space */}
            <div className="lg:col-span-4 flex flex-col gap-6 grid">
              <NewsNotificationsCard />
            </div>
          </div>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
}

export default Home;