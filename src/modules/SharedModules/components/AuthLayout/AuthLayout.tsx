import { Outlet } from "react-router-dom";
import logo from "../../../../assets/Logo-white.png";
import authImg from "../../../../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="bg-[#0D1321] w-full">
      <div className="flex items-center flex-col  lg:flex-row justify-between container mx-auto">
        <div className="min-h-screen px-12">
          <img src={logo} alt="logo" className="my-10 w-40" />
          <Outlet />
        </div>
        <div className="hidden px-5 md:flex md:py-5 ">
          <img src={authImg} alt="auth img" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
