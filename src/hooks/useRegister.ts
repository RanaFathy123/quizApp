import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../axiosConfig/axiosInstace";
import { FormDataRegister } from "../interfaces/interfaces";

const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>();

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      toast.success(response.data.message || "Register Success");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Register Fail");
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useRegister;
