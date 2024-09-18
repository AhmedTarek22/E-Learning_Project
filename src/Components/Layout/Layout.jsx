import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const noFooterPaths = ["/login", "/signup", "/unauthorized"];
  const noNavPaths = ["/unauthorized"];
  const showFooter = !noFooterPaths.includes(location.pathname);
  const showNav = !noNavPaths.includes(location.pathname);
  return (
    <>
      {showNav && <NavBar />}
      <div className="">
        <Outlet></Outlet>
      </div>
      {showFooter && <Footer />}
    </>
  );
}
