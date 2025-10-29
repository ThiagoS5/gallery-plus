import { Outlet } from "react-router";
import MainContent from "../organism/main-content";
import MainHeader from "../organism/main-header";

export default function LayoutMain() {
  return (
    <>
      <MainHeader className="mt-7" />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
}
