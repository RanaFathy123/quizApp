import { useState } from "react";
import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstace";
import { toast } from "react-toastify";

const useStudentQuiz = () => {
  const [showJoinQuiz, setShowJoinQuiz] = useState(false);
  const handleOpenJoinQuiz = () => {
    setShowJoinQuiz(true);
  };
  const onSubmitCode = async (data: any) => {
    console.log(data);
    try {
      const response = await axiosInstanceWithHeaders.post("/quiz/join", data);
      console.log(response);
      toast.success(response.data.message);
      setShowJoinQuiz(false);
    } catch (err) {
      console.log(err);
      toast.error("Please Fill Code");
    }
  };
  return {
    showJoinQuiz,
    handleOpenJoinQuiz,
    onSubmitCode,
    setShowJoinQuiz,
  };
};

export default useStudentQuiz;
