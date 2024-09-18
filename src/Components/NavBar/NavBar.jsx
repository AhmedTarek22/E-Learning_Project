import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import LanguageSwitcher from "../SwitchLang/LangSwitcher";
import { useAuth } from "../../Context/AuthContext";
import Spinner from "../Spinner";

export default function NavBar() {
  const [checklogin, setIsLogin] = useState(false);
  const { loginStatus } = useAuthStatus();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wishlistLength = useSelector((state) => state.wishlist.wishlist.length);

  const { isAdmin, loading } = useAuth();

  let userName = "";
  if (auth.currentUser) {
    userName = auth.currentUser.displayName.split(" ")[0];
  }
  const translate = useSelector((state) => state.language.translation);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function onLogout() {
    auth.signOut().then(() => {
      setIsLogin(false);
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    });
  }

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus) {
      setIsLogin(true);
    } else {
      setIsLogin(loginStatus);
    }
  }, [loginStatus]);

  useEffect(() => {
    if (checklogin) {
      localStorage.setItem("isLoggedIn", "true");
    }
  }, [checklogin]);

  // تابع للتحقق من المسار النشط
  const getLinkClassName = ({ isActive }) =>
    `block py-2 pl-3 pr-4 rounded lg:p-0 ${
      isActive ? "text-amber-700" : "text-gray-700"
    } ${isActive ? "" : "hover:bg-gray-50"} ${
      isActive ? "" : "border-b border-gray-100"
    } lg:hover:bg-transparent lg:border-0 lg:hover:text-amber-500 lg:p-0 lg:dar`;

  function checkvalidity() {
    if (!loginStatus) {
      toast.error("please login first");
    }
  }
  if (loading) return <Spinner />;

  return (
    <>
      <nav className="bg-[#FFF8D9] border-gray-200 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link to="/">
            <span className="self-center text-amber-700 text-xl font-semibold whitespace-nowrap font-mono">
              {translate.Logo}
            </span>
          </Link>

          <div className="flex items-center lg:order-2">
            <div className="hidden mt-2 mr-4 sm:inline-block">
              <span></span>
            </div>
            {checklogin ? (
              <>
                <p className="text-amber-700 font-medium me-3">
                  {userName ? `welcome: ${userName}` : "welcome User"}
                </p>
                <div className="profile">
                  <div className="dropdown">
                    <button className="dropbtn">
                      <img
                        className="inline-block w-8 h-8 rounded-full ring-2 ring-white"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                    <div className="dropdown-content">
                      <Link to="/Profile">{translate.EditProfile}</Link>
                      {isAdmin && <Link to="/admin">Dashbord</Link>}
                      <a className="cursor-pointer" onClick={onLogout}>
                        {translate.Logout}
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  className="text-gray-500 hover:bg-slate-300 hover:bg-opacity-25 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 hover:bg-amber-text-amber-500 focus:outline-none"
                  to="login"
                >
                  {translate.Login}
                </NavLink>

                <NavLink
                  className="text-white bg-amber-600 hover:bg-amber-500 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-3 lg:py-2 sm:ml-2 lg:mr-0 hover:bg-amber-text-amber-500 focus:outline-none"
                  to="register"
                >
                  {translate.Register} {translate.now}
                </NavLink>
              </>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{translate.OpenMainMenu}</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d={`M3 ${
                    isMenuOpen ? "10" : "5"
                  }a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 ${
                    isMenuOpen ? "5" : "10"
                  }a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 ${
                    isMenuOpen ? "15" : "10"
                  }a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z`}
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
              isMenuOpen ? "" : "hidden"
            }`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 justify-center items-center">
              <li>
                <NavLink className={getLinkClassName} to="">
                  {translate.Home}
                </NavLink>
              </li>
              <li>
                <NavLink className={getLinkClassName} to="about">
                  {translate.AboutUs}
                </NavLink>
              </li>
              <li>
                <NavLink className={getLinkClassName} to="courses">
                  {translate.Courses}
                </NavLink>
              </li>
              <li>
                <NavLink className={getLinkClassName} to="contact">
                  {translate.ContactUs}
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={getLinkClassName}
                  to="mycourses"
                  onClick={checkvalidity}
                >
                  {translate.MyCourses}
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={getLinkClassName}
                  to="mywishlist"
                  onClick={checkvalidity}
                >
                  {translate.MyWishlist}
                  <span className="text-black-200 font-normal border border-gray-400 rounded-full text-sm inline-block w-[20px] text-center ml-1 ">
                    {wishlistLength}
                  </span>
                </NavLink>
              </li>

              <li>
                <LanguageSwitcher></LanguageSwitcher>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
