import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import SonnerToast from "./components/global/toast/SonnerToast";
import "./i18n";
import AppInitializer from "./providers/AppInitializer";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "@/styles/global/index.css";

// build query client that every useQuery and useMutation use it
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider>
    <AppInitializer>
      <QueryClientProvider client={queryClient}>
        <SonnerToast />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppInitializer>
  </Provider>
);
