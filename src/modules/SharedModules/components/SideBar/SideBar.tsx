import { IoIosHelpCircleOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import dashboardIconActive from "../../../../assets/Dashboard icon active.png";
import dashboardIcon from "../../../../assets/Dashboard icon.png";
import quizIconActive from "../../../../assets/Quiz icon active.png";
import quizIcon from "../../../../assets/Quiz icon.png";
import resultIconActive from "../../../../assets/Results icon active.png";
import resultsIcon from "../../../../assets/Results icon.png";
import gpIconActive from "../../../../assets/Students icon active.png";
import gpIcon from "../../../../assets/Students icon.png";
import { useSelector } from "react-redux";

const SideBar = ({ menuOpen, closeMenu }: any) => {
  const { pathname } = useLocation();
  const { loginData } = useSelector((state: any) => state.login);
  console.log(loginData);

  return (
    <aside
      id="sidebar"
      onClick={closeMenu}
      className={`lg:bg-transparent bg-white text-black z-30  border-2 md:w-52 space-y-6 fixed top-0 left-0 h-full pt-16 px-0 transform transition duration-200 ease-in-out  ${
        menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
    >
      <div
        className="flex flex-col space-y-6"
        data-dev-hint="optional div for having an extra footer navigation"
      >
        <nav data-dev-hint="main navigation">
          {loginData?.role == "Instructor" && <Link
            to="/dashboard"
            className={
              pathname == "/dashboard"
                ? "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200  text-[#000000] font-bold"
                : "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200  "
            }
          >
            {pathname == "/dashboard" ? (
              <img
                src={dashboardIconActive}
                alt="quizes"
                className="p-2 bg-[#0D1321]  rounded-lg "
              />
            ) : (
              <img
                src={dashboardIcon}
                alt="quizes"
                className="p-2 bg-[#FFEDDF] text-[#0D1321] rounded-lg "
              />
            )}

            <span className="text-[1.2em]">Dashboard</span>
          </Link>}
          {loginData?.role == "Instructor" &&<hr className="border-0 h-1 bg-none border-t-2  border-gray-300 " />}
          {loginData?.role == "Instructor" &&<Link
            to="/dashboard/students"
            className={
              pathname == "/dashboard/students"
                ? "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200  text-[#000000]  font-bold"
                : "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200  "
            }
          >
            {pathname == "/dashboard/students" ? (
              <img
                src={dashboardIconActive}
                alt="quizes"
                className="p-2 bg-[#0D1321]  rounded-lg "
              />
            ) : (
              <img
                src={dashboardIcon}
                alt="quizes"
                className="p-2 bg-[#FFEDDF] text-[#0D1321] rounded-lg "
              />
            )}
            <span className="text-[1.2em]">Students</span>
          </Link>}
          {loginData?.role == "Instructor" &&<hr className="border-0 h-1 bg-none border-t-2  border-gray-300 " />}
          {loginData?.role == "Instructor" &&<Link
            to="/dashboard/groups"
            className={
              pathname == "/dashboard/groups"
                ? "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200 font-bold text-[#000000]"
                : "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200  "
            }
          >
            {pathname == "/dashboard/groups" ? (
              <img
                src={gpIconActive}
                alt="quizes"
                className="p-2 bg-[#0D1321]  rounded-lg "
              />
            ) : (
              <img
                src={gpIcon}
                alt="quizes"
                className="p-2 bg-[#FFEDDF] text-[#0D1321] rounded-lg "
              />
            )}
            <span className="text-[1.2em]">Groups</span>
          </Link>}
          {loginData?.role == "Instructor" &&<hr className="border-0 h-1 bg-none border-t-2  border-gray-300 " />}
          <Link
            to="/dashboard/quizes"
            className={
              pathname == "/dashboard/quizes"
                ? "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200 font-bold text-[#000000]"
                : "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200  "
            }
          >
            {pathname == "/dashboard/quizes" ? (
              <img
                src={quizIconActive}
                alt="quizes"
                className="p-2 bg-[#0D1321]  rounded-lg "
              />
            ) : (
              <img
                src={quizIcon}
                alt="quizes"
                className="p-2 bg-[#FFEDDF] text-[#0D1321] rounded-lg "
              />
            )}

            <span className="text-[1.2em]">Quizes</span>
          </Link>
          <hr className="border-0 h-1 bg-none border-t-2  border-gray-300 " />
          <Link
            to="/dashboard/results"
            className={
              pathname == "/dashboard/results"
                ? "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200 font-bold text-[#000000]"
                : "flex items-center gap-3 py-4 px-4 mt-2 transition duration-200  "
            }
          >
              {pathname == "/dashboard/results" ? (
              <img
                src={resultIconActive}
                alt="quizes"
                className="p-2 bg-[#0D1321]  rounded-lg "
              />
            ) : (
              <img
                src={resultsIcon}
                alt="quizes"
                className="p-2 bg-[#FFEDDF] text-[#0D1321] rounded-lg "
              />
            )}
        
            <span className="text-[1.2em]">Results</span>
          </Link>
          <hr className="border-0 h-1 bg-none border-t-2  border-gray-300 " />
          <hr className="border-0 h-1 bg-none border-t-2  border-gray-300 mt-20" />
          <Link
            to=""
            className="flex items-center gap-3 py-4 px-4 transition duration-200"
          >
            <IoIosHelpCircleOutline className="text-[2.5em] bg-[#FFEDDF] text-[#0D1321] rounded-lg px-1" />
            <span className="text-[1.2em]">Help</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
