import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstanceWithHeaders } from '../axiosConfig/axiosInstace';
import { FormDataChangPass } from '../interfaces/interfaces';

const useChangePass = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
      } = useForm<FormDataChangPass>();
      const navigate = useNavigate();

      const onSubmit = async (data: any) => {
        try {
          const response = await axiosInstanceWithHeaders.post("/auth/change-password", data);
          toast.success(response.data.message || "Your Password Has Been changed");
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
        watch
      };
}

export default useChangePass