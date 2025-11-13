import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { BrowserRouter, Route, Routes } from "react-router";
import Components from "./components/organism/components";
import LayoutMain from "./components/templates/layout-main";
import PageHome from "./pages/page-home";
import PagePhotoDetails from "./pages/page-photo-details";
import { Toaster } from "sonner";

const queryClint = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClint}>
      <NuqsAdapter>
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutMain />}>
              <Route index element={<PageHome />} />
              <Route path="/fotos/:id" element={<PagePhotoDetails />} />
              <Route path="/componentes" element={<Components />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
