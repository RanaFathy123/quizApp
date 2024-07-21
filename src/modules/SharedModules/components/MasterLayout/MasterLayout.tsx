import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

const MasterLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <NavBar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <div className="flex min-h-screen">
        <SideBar menuOpen={menuOpen} closeMenu={closeMenu} />
        <main
          id="content"
          className="flex-1 pt-16 ml-3 lg:ml-56 lg:mr-8 mt-5"
          onClick={closeMenu}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MasterLayout;
