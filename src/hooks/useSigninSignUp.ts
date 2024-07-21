import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSigninSignUp = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log("l", showLogin, "s", showSignUp);

  const isShowLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
    navigate("/login");
  };
  const isShowSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
    navigate("/signup");
  };

  useEffect(() => {
    if (pathname == "/login" || pathname == "/") {
      setShowLogin(true);
      setShowSignUp(false);
    } else if (pathname == "/signup") {
      setShowSignUp(true);
      setShowLogin(false);
    }
  }, [pathname]);
  return {
    showLogin,
    showSignUp,
    isShowLogin,
    isShowSignUp,
    pathname,
  };
};

export default useSigninSignUp;
