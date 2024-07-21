import { useState } from "react";
import { IoTimer } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userLogo from "../../../../assets/avatar.png";
import logo from "../../../../assets/Logo icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../../ReduxSystem/slices/loginDataSlice";

const NavBar = ({ toggleMenu, menuOpen }: any) => {
  const [isNavOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state: any) => state.login);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const location = useLocation();

  let { pathname }: any = location;

  console.log(pathname.includes("/dashboard/"));

  if (pathname.includes("/dashboard/")) {
    pathname = pathname.split("/")[2];
    pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  } else {
    pathname = pathname.split("/")[1];
    pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  }
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <nav className="text-black fixed w-full lg:z-10 border-2 bg-white ">
      <div className=" flex flex-wrap items-center justify-between py-0 lg:py-2 container xl:px-12 lg:px-5  mx-auto">
        <div className="flex">
          <label
            htmlFor="menu-open"
            id="mobile-menu-button"
            className=" p-1 mx-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md md:block lg:hidden "
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <svg
                id="menu-close-icon"
                className="h-6 w-6 transition duration-200 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                id="menu-open-icon"
                className="h-6 w-6 transition duration-200 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </label>
          <img src={logo} alt="logo" className="w-16" />
          <div className="self-center text-2xl font-semibold whitespace-nowrap lg:px-32 hidden lg:block md:block">
            {pathname}
          </div>
        </div>
        <div className="flex items-center justify-center md:order-2 space-x-3 md:space-x-4 ">
          <div className="relative inline-block text-center">
            <button
              type="button"
              className="text-sm bg-gray-800 rounded-full  focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              onClick={toggleDropdown}
            >
              <img className="rounded-full" src={userLogo} alt="user photo" />
            </button>
            {dropdownOpen && (
              <div
                className="absolute top-8 right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Profile
                  </a>
                  <Link
                    to="/change-password"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={handleLogOut}
                  >
                    Change Password
                  </Link>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={handleLogOut}
                  >
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isNavOpen}
            onClick={toggleNav}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isNavOpen ? "" : "hidden"
          }`}
          id="navbar-user"
        >
          <ul
            className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            onClick={toggleNav}
          >
            <div className="self-center text-2xl font-semibold whitespace-nowrap lg:px-32 md:hidden lg:hidden">
              {pathname}
            </div>
            <button className="rounded-2xl bg-white border-2 px-5 border-blue-gray-200 py-2 flex items-center gap-2 text-center">
              <IoTimer className="text-[1.5em]" />
              {loginData?.role == "Instructor" ? "New quiz" : "Join Quiz"}
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
