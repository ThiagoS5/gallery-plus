import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import LayoutMain from "./components/templates/layout-main";

const PageHome = lazy(() => import("./pages/page-home"));
const PagePhotoDetails = lazy(() => import("./pages/page-photo-details"));
const Components = lazy(() => import("./components/organism/components"));

const queryClint = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClint}>
      <NuqsAdapter>
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<LayoutMain />}>
                <Route index element={<PageHome />} />
                <Route path="/fotos/:id" element={<PagePhotoDetails />} />
                <Route path="/componentes" element={<Components />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
