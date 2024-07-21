import { useForm } from "react-hook-form";
import { FormDataResetPass } from "../interfaces/interfaces";
import { toast } from "react-toastify";
import { axiosInstance } from "../axiosConfig/axiosInstace";
import { useNavigate } from "react-router-dom";

const useResetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataResetPass>();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", data);
      toast.success(response.data.message || "Your Password Has Been reset");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "fail");
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useResetPass;
