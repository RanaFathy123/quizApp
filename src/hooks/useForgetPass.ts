import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../axiosConfig/axiosInstace";
import { FormDataForgetPass } from "../interfaces/interfaces";

const useForgetPass = () => {
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataForgetPass>();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", data);
      toast.success(response.data.message || "email sent");

      navigate("/reset-password");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "fail sent email");
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useForgetPass;
