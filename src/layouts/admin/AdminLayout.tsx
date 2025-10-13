import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import { Outlet, useMatches } from "react-router-dom";
import Page from "./page/Page";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function AdminLayout() {
  const matches = useMatches();

  const noPadding = matches.some((match) => {
    const handle = (match as { handle?: { noPadding?: boolean } }).handle;
    return Boolean(handle?.noPadding);
  });

  return (
    <div
      className={`relative flex flex-col scroll-bar transition-colors duration-[0.3s]`}
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

export default AdminLayout;
