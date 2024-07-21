import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstace";
import { getAllGroups } from "../ReduxSystem/slices/groupDataSlice";
import { toast } from "react-toastify";

const useQuizList = () => {
  const [completedQuizes, setCompletedQuizes] = useState([]);
  const [upCommingQuiz, setUpCommingQuiz] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [outPutDate, setOutPutDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [quizCode, setQuizCode] = useState("");
  const [showQuizCodeModal, setShowQuizCodeModal] = useState(false);
  const datePickerRef = useRef<any>(null);
  const { loginData } = useSelector((state: any) => state.login);
  const { groups } = useSelector((state: any) => state.groupsData);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const handleIconClick = () => {
    datePickerRef.current.setFocus();
  };
  const getCompletedQuizes = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get("/quiz/completed");
      const completedQuizes = response.data;

      setCompletedQuizes(completedQuizes);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeDate = (date: any) => {
    const inputDate = moment(date, "ddd MMM DD YYYY HH:mm:ss ZZ");
    const outputDateStr = inputDate.format("YYYY-MM-DDTHH:mm:ss");
    setSelectedDate(date);
    setOutPutDate(outputDateStr);
  };
  const handleOpenModal = () => {
    setShowModal(true);
    reset({
      title: "",
      questions_number: "",
      description: "",
      group: "",
      difficulty: "",
      duration: "",
      score_per_question: "",
      schadule: "",
    });
    setSelectedDate(null);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (data: any) => {
    if (selectedDate ) {
      try {
        const response = await axiosInstanceWithHeaders.post("/quiz", {
          ...data,
          schadule: outPutDate,
        });
        toast.success("Quiz Created Successfully");
        const quizCode = response.data.data.code;
        setQuizCode(quizCode);
        setShowModal(false);
        setShowQuizCodeModal(true);
      } catch (err: any) {
        toast.error(err.response.data.message[0]);
        console.log(err);
      }
    } else {
      toast.error("schadule is requried");
    }
  };
  const getUpCommingQuiz = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get("/quiz/incomming");
      const upCommingQuiz = response.data;
      const reversedUpCommingQuiz = upCommingQuiz.reverse()
      console.log(reversedUpCommingQuiz);
      
      setUpCommingQuiz(upCommingQuiz);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCompletedQuizes();
    dispatch(getAllGroups());
    getUpCommingQuiz();
  }, [loginData]);

  return {
    completedQuizes,
    selectedDate,
    showModal,
    quizCode,
    showQuizCodeModal,
    groups,
    register,
    handleSubmit,
    handleIconClick,
    datePickerRef,
    handleChangeDate,
    handleOpenModal,
    handleClose,
    setQuizCode,
    setShowModal,
    setShowQuizCodeModal,
    outPutDate,
    setOutPutDate,
    setSelectedDate,
    onSubmit,
    upCommingQuiz,
  };
};

export default useQuizList;
