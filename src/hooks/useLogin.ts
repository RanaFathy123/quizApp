import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../axiosConfig/axiosInstace";
import { FormData } from "../interfaces/interfaces.ts";
import { useDispatch, useSelector } from "react-redux";
import { saveLoginData } from "../ReduxSystem/slices/loginDataSlice.tsx";

const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { loginData } = useSelector((state: any) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      console.log(response.data.data.accessToken);
      const token = response.data.data.accessToken;
      localStorage.setItem("token", token);
      toast.success(response.data.message || "Login Success");
      dispatch(saveLoginData());
      if (loginData?.role == "Instructor") {
        navigate("/dashboard");
      } else if (loginData?.role == "Student") {
        navigate("/dashboard/quizes");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login Fail");
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useLogin;
