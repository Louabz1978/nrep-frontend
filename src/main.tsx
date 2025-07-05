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

// build query client that every useQuery and useMutation use it
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider>
    <AppInitializer>
      <QueryClientProvider client={queryClient}>
        <SonnerToast />
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </AppInitializer>
  </Provider>
);
