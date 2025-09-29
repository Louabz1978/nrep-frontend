import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import SonnerToast from "./components/global/toast/SonnerToast";
import AppInitializer from "./providers/AppInitializer";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "@/styles/global/index.css";
import { AnimatePresence } from "framer-motion";
// import { ColorPaletteProvider } from "./providers/ColorPaletteProvider";
import NuqsProvider from "./providers/NuqsProvider";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { SessionManager } from "./components/global/sessionManager/SessionManager";

// build query client that every useQuery and useMutation use it
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider>
    {/* <ColorPaletteProvider> */}
    <NuqsProvider>
      <AppInitializer>
        <QueryClientProvider client={queryClient}>
          <SonnerToast />
          <SessionManager key="session-manager" />
          <AnimatePresence mode="wait">
            <RouterProvider key="router-provider" router={router} />
            {/* <ColorPaletteEditor /> */}
          </AnimatePresence>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AppInitializer>
    </NuqsProvider>
    {/* </ColorPaletteProvider> */}
  </Provider>
);
