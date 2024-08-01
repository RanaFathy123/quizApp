import { format } from "date-fns";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstace";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import Loading from "../../../SharedModules/components/Loading/Loading";

const QuizData = () => {
  const [quizData, setQuizData] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { handleSubmit, register, reset } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  const getQuizDetails = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get(`/quiz/${id}`);
      console.log(response.data);
      const quizData = response.data;
      setQuizData(quizData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteQuiz = async () => {
    try {
      const response = await axiosInstanceWithHeaders.delete(`/quiz/${id}`);
      toast.success(response.data.message);
      navigate("/dashboard/quizes");
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpeningDelete = () => {
    setOpenDelete(true);
  };
  const handleClosingDelete = () => {
    setOpenDelete(false);
  };
  const handleOpenEditModal = (title: string) => {
    setShowModal(true);
    reset({ title: title });
  };
  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstanceWithHeaders.put(`/quiz/${id}`, data);
      setShowModal(false);
      toast.success(response.data.message);
      getQuizDetails();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getQuizDetails();
  }, []);

  if (!quizData) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {/* Edit Modal */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="w-auto my-6 mx-auto  ">
              <div className="border-0 rounded-lg shadow-lg  flex flex-col  bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start border-b border-gray-400">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
                        <h3>Edit {quizData?.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="submit"
                          form="groupForm"
                          className="border-s border-gray-400 rounded-none inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setShowModal(false)}
                          type="button"
                          className="inline-flex justify-center border-s border-gray-400 rounded-none px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <form
                      id="groupForm"
                      className="max-w-sm mx-auto my-5 relative"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="relative mb-4">
                        <button
                          id="dropdown-phone-button"
                          className="absolute top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100"
                          type="button"
                        >
                          Title
                        </button>
                        <input
                          type="text"
                          className="block border-2 w-full h-10 pl-28 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          {...register("title")}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                {/*body*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
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
                      Delete Quiz
                    </DialogTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="border-s border-gray-400 rounded-none inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                      onClick={deleteQuiz}
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
      <div className="quiz-data w-full max-w-4xl me-auto p-4">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center">
            <span className="text-xl font-semibold">Quizes</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="ml-3 text-lg">
              Data structures {quizData?.title}
            </span>
          </div>
        </div>
        <div className="data border rounded-lg p-5 mt-4 bg-white shadow-md">
          <h4 className="text-2xl font-bold mb-2">
            Data Structures {quizData?.title}
          </h4>
          <div className="flex items-center mt-2 space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            <span>
              <p>
                {quizData?.schadule
                  ? format(new Date(quizData.schadule), "dd / MM / yyyy")
                  : "No schedule available"}
              </p>
            </span>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="ml-1">
                <p>
                  {quizData?.schadule
                    ? format(new Date(quizData.schadule), "hh:mm a")
                    : "No schedule available"}
                </p>
              </span>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <div className="border rounded-lg p-3 flex justify-between items-center">
              <p className="bg-[#FFEDDF] p-5 rounded-lg w-1/2">Duration</p>
              <p>{quizData?.duration}</p>
            </div>

            <div className="border rounded-lg p-3 flex justify-between items-center">
              <p className="bg-[#FFEDDF] p-5 rounded-lg w-1/2">
                Number of questions
              </p>
              <p>{quizData?.questions_number}</p>
            </div>
            <div className="border rounded-lg p-3 flex justify-between items-center">
              <p className="bg-[#FFEDDF] p-5 rounded-lg w-1/2">
                Score per question
              </p>
              <p>{quizData?.score_per_question}</p>
            </div>
            <div className="border rounded-lg p-3">
              <p className="bg-[#FFEDDF] p-5 rounded-lg">Description</p>
              <p className="mt-2">
                {quizData?.description == ""
                  ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat magni harum, sunt obcaecati, itaque, numquam laborum dolorum alias recusandae nam at optio id voluptas ratione corporis iusto earum in soluta"
                  : quizData?.description}
              </p>
            </div>
            <div className="border rounded-lg p-3 flex justify-between items-center">
              <p className="bg-[#FFEDDF] p-5 rounded-lg w-1/2">Quiz Type</p>
              <p>{quizData?.type}</p>
            </div>
          </div>
          <div className="flex items-center mt-5 space-x-3">
            <div className="bg-black rounded-lg p-1 text-white flex items-center justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <p>Randomize questions</p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <button
              className="py-2 px-4 rounded-2xl border-2"
              onClick={handleOpeningDelete}
            >
              <FaTrash className="text-[1.9em] text-red-600" />
            </button>
            <button
              className=" text-white font-bold flex items-center gap-1 bg-[#0D1321] py-3 px-10 rounded-2xl"
              onClick={() => handleOpenEditModal(quizData?.title)}
            >
              <MdModeEdit className="text-[1.5em]" /> Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizData;
