import React from "react";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import useSigninSignUp from "../../../../hooks/useSigninSignUp";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const SignInSignUp: React.FC = () => {
  const { showLogin, showSignUp, isShowLogin, isShowSignUp, pathname } =
    useSigninSignUp();
  return (
    <div className="container mx-auto">
      <p className="text-[#C5D86D] text-[25px] my-5">
        {showLogin || pathname == "/login"
          ? "Continue your learning journey with QuizWiz!"
          : "Create your account and start using QuizWiz!"}
      </p>
      <div className="flex gap-10">
        <button
          className={
            showLogin || pathname == "/login" || pathname == "/"
              ? "bg-[#333333] text-[#C5D86D] px-10 py-1 font-bold border-4 border-[#C5D86D] rounded-lg"
              : "bg-[#333333] text-white  rounded-lg px-10 py-1 font-bold"
          }
          onClick={isShowLogin}
        >
          <FaUser className="text-[3em] my-3" />
          Signin
        </button>
        <button
          onClick={isShowSignUp}
          className={
            showSignUp || pathname == "/signup"
              ? "bg-[#333333] text-[#C5D86D] px-10 py-1 font-bold border-4 border-[#C5D86D] rounded-lg text-center"
              : "bg-[#333333] text-white p-8 rounded-lg px-10 py-1 font-bold text-center"
          }
        >
          <FaUserPlus className="text-[3em] my-3 text-center mx-auto" />
          Signup
        </button>
      </div>
      {showLogin || pathname == "/login" || pathname == "/" ? <Login /> : ""}
      {showSignUp || pathname == "/signup" ? <SignUp /> : ""}
    </div>
  );
};

export default SignInSignUp;
