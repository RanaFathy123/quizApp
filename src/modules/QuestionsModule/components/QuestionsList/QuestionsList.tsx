import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstace";
import Loading from "../../../SharedModules/components/Loading/Loading";

const QuestionsList = () => {
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [questionID, setQuestionID] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpen = () => {
    setShowModal(true);
    setIsUpdate(false);
    reset({
      title: "",
      description: "",
      options: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      answer: "",
      difficulty: "",
      type: "",
    });
  };

  const handleOpenUpdate = (question: any) => {
    setShowModal(true);
    setIsUpdate(true);
    setQuestionID(question._id);
    reset({
      title: question.title,
      description: question.description,
      options: {
        A: question.options.A,
        B: question.options.B,
        C: question.options.C,
        D: question.options.D,
      },
      answer: question.answer,
      difficulty: question.difficulty,
      type: question.type,
    });
  };

  const getAllQuestions = async () => {
    try {
      let response = await axiosInstanceWithHeaders.get("/question");
      let data = response.data;
      setListOfQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: any) => {
    if (!isUpdate) {
      try {
        const response = await axiosInstanceWithHeaders.post(
          "/question",
          values
        );
        handleClose();
        toast.success(response.data.message || "Question created successfully");
        getAllQuestions();
        reset();
      } catch (error) {
        console.log(error);
      }
    } else if (isUpdate) {
      try {
        const response = await axiosInstanceWithHeaders.put(
          `/question/${questionID}`,
          values
        );
        handleClose();
        toast.success(response.data.message || "Question updated successfully");
        getAllQuestions();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deletingQuestion = async () => {
    try {
      const response = await axiosInstanceWithHeaders.delete(
        `/question/${questionID}`
      );
      getAllQuestions();
      handleClosingDelete();
      toast.success(response?.data?.message || "Group deleted successfully");
    } catch (error: any) {
      console.log(error);
      toast.success(error?.response?.data?.message || "There's an error");
    }
  };
  const handleOpeningDelete = (id: string) => {
    setQuestionID(id);
    setOpenDelete(true);
  };

  const handleClosingDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <>
      <Dialog open={openDelete} onClose={handleClosingDelete}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start border-b border-gray-400">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Delete Question
                    </DialogTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={deletingQuestion}
                      type="button"
                      className="border-s border-gray-400 rounded-none inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleClosingDelete}
                      type="button"
                      className="border-s border-gray-400 rounded-none inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="my-6 mx-auto w-full sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2 p-4">
              <div className="border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between border-b border-solid border-blueGray-200">
                  <div className="bg-white rounded-lg w-full">
                    <div className="sm:flex sm:items-start border-b border-gray-400">
                      <div className="text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow px-3 py-2">
                        <h3 className="my-2">
                          {!isUpdate
                            ? "Set up a new Question"
                            : "Update Question"}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="submit"
                          form="Question"
                          className="border-s border-gray-400 rounded-none inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          <CheckIcon className="h-5 w-5 my-2" />
                        </button>
                        <button
                          onClick={handleClose}
                          type="button"
                          className="inline-flex justify-center border-s border-gray-400 rounded-none px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          <XMarkIcon className="h-5 w-5 my-2" />
                        </button>
                      </div>
                    </div>
                    <form
                      id="Question"
                      className="w-full mx-auto my-5 p-5"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="relative mb-4">
                        <span className="absolute top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                          Title
                        </span>
                        <input
                          type="text"
                          {...register("title", { required: true })}
                          className="block border-2 h-10 w-full pl-20 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="relative mb-4">
                        <span className="absolute  top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                          Description
                        </span>
                        <input
                          type="text"
                          {...register("description", { required: true })}
                          className="block border-2 h-10 w-full pl-28 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col md:flex-row md:space-x-4 w-full">
                        <div className="relative mb-4 w-1/2">
                          <span className="absolute top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            A
                          </span>
                          <input
                            type="text"
                            {...register("options.A")}
                            className="block border-2 h-10 w-full pl-16 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="relative mb-4 w-1/2">
                          <span className="absolute top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            B
                          </span>
                          <input
                            type="text"
                            {...register("options.B")}
                            className="block border-2 h-10 w-full pl-16 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:space-x-4 w-full">
                        <div className="relative mb-4 w-1/2">
                          <span className="absolute top-0  left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            C
                          </span>
                          <input
                            type="text"
                            {...register("options.C")}
                            className="block border-2 h-10 w-full pl-16 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="relative mb-4 w-1/2">
                          <span className="absolute top-0 h-10 left-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            D
                          </span>
                          <input
                            type="text"
                            {...register("options.D")}
                            className="block border-2 h-10 w-full pl-16 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col xl:flex-row gap-3 xl:items-center w-full">
                        <div className="relative xl:w-1/2">
                          <span className="absolute top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            Right answer
                          </span>
                          <input
                            type="text"
                            {...register("answer")}
                            className="block border-2 w-full h-10 pl-32 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="relative mb-4 xl:w-1/2">
                          {/* <span className="absolute top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100"> */}
                          Category type
                          {/* </span> */}
                          <select
                            {...register("type")}
                            className="ps-26 bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option value={"FE"}>FE</option>
                            <option value={"BE"}>BE</option>
                            <option value={"DO"}>DO</option>
                          </select>
                        </div>
                      </div>
                      Difficulty
                      <select
                        {...register("difficulty")}
                        className="ps-26 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value={"easy"}>easy</option>
                        <option value={"medium"}>medium</option>
                        <option value={"hard"}>hard</option>
                      </select>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="border max-w-64 md:max-w-full lg:max-w-full border-gray-300 p-4 sm:p-6 bg-white shadow-lg rounded-lg   mx-auto  ">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-0">
              Bank Of Questions
            </h2>
            <div className="flex items-center border border-gray-300 rounded-full px-4 sm:px-6 py-2">
              <div className="bg-black p-2 rounded-full text-white">
                <FaPlus />
              </div>
              <button onClick={handleOpen} className="pl-2 text-sm sm:text-lg">
                Add Questions
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className=" bg-white border border-[#D9D9D9] w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-r bg-[#0D1321] text-white rounded-tl-lg">
                    Questions Title
                  </th>
                  <th className="py-2 px-4 border-b border-r bg-[#0D1321] text-white">
                    Questions Desc
                  </th>
                  <th className="py-2 px-4 border-b border-r bg-[#0D1321] text-white">
                    Question Difficulty Level
                  </th>
                  <th className="py-2 px-4 border-b border-r bg-[#0D1321] text-white">
                    Date
                  </th>
                  <th className="py-2 px-4 border-b border-r bg-[#0D1321] text-white rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listOfQuestions.length > 0 &&
                  listOfQuestions.map((question: any) => (
                    <tr key={question._id}>
                      <td className="py-2 px-4 border-b border-r text-center">
                        {question.title}
                      </td>
                      <td className="py-2 px-4 border-b border-r text-center">
                        {question.description}
                      </td>
                      <td className="py-2 px-4 border-b border-r text-center">
                        {question.difficulty}
                      </td>
                      <td className="py-2 px-4 border-b border-r text-center">
                        {question.type}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <div className="flex justify-around items-center text-[#FB7C19] gap-2">
                          <MdDelete
                            className="text-xl"
                            onClick={() => handleOpeningDelete(question._id)}
                          />
                          <FaRegEdit
                            className="text-xl"
                            onClick={() => handleOpenUpdate(question)}
                          />
                          {/* <FaEye className="text-xl" /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {listOfQuestions.length == 0 && (
              <div className="w-full flex justify-center items-center h-screen">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsList;
