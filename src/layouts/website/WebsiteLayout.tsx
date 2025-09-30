import { Outlet, useMatches } from "react-router-dom";
import Page from "./page/Page";
import Header from "./header/Header";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import Footer from "./footer/Footer";

function WebsiteLayout() {
  const matches = useMatches();

  const useWhiteBackground = matches.some((match) => {
    const handle = (match as { handle?: { whiteBg?: boolean } }).handle;
    return Boolean(handle?.whiteBg);
  });

  // ✅ detect if current route wants noPadding
  const noPadding = matches.some((match) => {
    const handle = (match as { handle?: { noPadding?: boolean } }).handle;
    return Boolean(handle?.noPadding);
  });

  return (
    <div
      className={`relative ${useWhiteBackground ? "bg-white" : "bg-primary-bg"}
        min-h-full flex flex-col scroll-bar transition-colors duration-[0.3s]`}
    >
      <AnimateContainer>
        <Header />
        {/* Page content */}
        <Page noPadding={noPadding}>
          <Outlet />
        </Page>

        <Footer />
      </AnimateContainer>
    </div>
  );
}

export default WebsiteLayout;
