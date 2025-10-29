import { BrowserRouter, Route, Routes } from "react-router";
import Components from "./components/organism/components";
import LayoutMain from "./components/templates/layout-main";
import PageHome from "./pages/page-home";
import PagePhotoDetails from "./pages/page-photo-details";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index element={<PageHome />} />
          <Route path="/fotos/:id" element={<PagePhotoDetails />} />
          <Route path="/componentes" element={<Components />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
