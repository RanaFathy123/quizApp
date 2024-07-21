import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }: any) {
  const {pathname}=useLocation()
  console.log(pathname);
  
  const { loginData } = useSelector((state: any) => state.login);
  if (localStorage.getItem("token") && loginData?.role == "Instructor" )
    return <Navigate to="/dashboard" />;
  else if (localStorage.getItem("token") && loginData?.role == "Student")
    return <Navigate to="/dashboard/quizes" />;

  else return children;
}
