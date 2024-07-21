import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import quizIcon from "../../../../assets/new quiz icon.png";
import questionBank from "../../../../assets/Question bank.png";
import useQuizList from "../../../../hooks/useQuizList";
import CompletedQuizes from "../../../SharedModules/components/CompletedQuizes/CompletedQuizes";
import Loading from "../../../SharedModules/components/Loading/Loading";
import UpCommingQuizes from "../../../SharedModules/components/UpCommingQuizing/UpCommingQuizes";
import QuizCodeModal from "../QuizCodeModal/QuizCodeModal";
import useStudentQuiz from "../../../../hooks/useStudentQuiz";

const QuizList = () => {
  const {
    register,
    handleSubmit,
    groups,
    datePickerRef,
    handleIconClick,
    handleOpenModal,
    showModal,
    handleClose,
    selectedDate,
    quizCode,
    handleChangeDate,
    showQuizCodeModal,
    setShowQuizCodeModal,
    onSubmit,
    upCommingQuiz,
  } = useQuizList();

  const { handleOpenJoinQuiz, showJoinQuiz, onSubmitCode, setShowJoinQuiz } =
    useStudentQuiz();
  const { loginData } = useSelector((state: any) => state.login);

  return (
    <>
      {/* Instructor */}
      {showQuizCodeModal ? (
        <>
          <QuizCodeModal
            setShowQuizCodeModal={setShowQuizCodeModal}
            quizCode={quizCode}
          />
        </>
      ) : (
        ""
      )}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="my-6 mt-[10em] md:mt-0 mx-auto w-full sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2 p-4 ">
              <div className="border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between border-b border-solid border-blueGray-200">
                  <div className="bg-white rounded-lg w-full">
                    <div className="sm:flex sm:items-start border-b border-gray-400">
                      <div className="text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow px-3 py-2">
                        <h3 className="my-2 font-bold">Set up a new Quiz</h3>
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
                        <span className="absolute top-0 font-bold left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm  text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                          Title:
                        </span>
                        <input
                          type="text"
                          {...register("title", { required: true })}
                          className="block border-2 h-10 w-full pl-20 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col 2xl:flex-row 2xl:space-x-2 md:flex-col">
                        <div className="relative mb-4 w-full">
                          <span className="absolute font-bold text-left top-0 left-0 h-10  inline-flex items-center py-2.5 px-4 text-sm   text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            Duration (in minutes)
                          </span>
                          <input
                            type="text"
                            {...register("duration", { required: true })}
                            className="block border-2 h-10 w-full pl-48 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="relative mb-4 w-full">
                          <span className="absolute font-bold top-0 left-0 h-10  inline-flex items-center py-2.5 px-4 text-sm  text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            No. of questions
                          </span>
                          <input
                            type="text"
                            {...register("questions_number", {
                              required: true,
                            })}
                            className="block border-2 h-10 w-full pl-44 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="relative mb-4 w-full">
                          <span className="absolute font-bold top-0 left-0 h-10 inline-flex items-center py-2.5 px-4 text-sm  text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            Score per question
                          </span>
                          <input
                            type="text"
                            {...register("score_per_question", {
                              required: true,
                            })}
                            className="block border-2 h-10 w-full pl-44 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="relative mb-4">
                        <span className="absolute font-bold top-0 left-0 h-20  inline-flex items-center py-2.5 px-4 text-sm  text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                          Description
                        </span>
                        <input
                          type="text"
                          {...register("description")}
                          className="block border-2 h-20 w-full pl-32 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="w-full mb-3">
                        <div className="flex">
                          <span className="h-10 font-bold  inline-flex items-center py-2.5 px-4 text-sm  text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100">
                            Schedule
                          </span>
                          <div className="relative w-full">
                            <DatePicker
                              selected={selectedDate}
                              onChange={handleChangeDate}
                              showTimeSelect
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              dateFormat="dd-MM-yyyy h:mm aa"
                              timeCaption="time"
                              className=" font-bold border-2 rounded-lg py-2.5 pl-10 pr-4 h-10 w-full"
                              ref={datePickerRef}
                            />
                            <FaCalendarAlt
                              onClick={handleIconClick}
                              className="absolute  left-3 top-1/2 transform -translate-y-1/2 "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col xl:flex-row gap-1 items-center w-full pt-2">
                        <div className="flex items-center w-full mb-4 ">
                          <div className="h-10 font-bold inline-flex items-center py-2.5 px-4 text-sm text-left text-gray-900 border border-gray-300 rounded-l-lg bg-pink-100">
                            Difficulty level
                          </div>
                          <select
                            {...register("difficulty")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option value={"easy"}>easy</option>
                            <option value={"medium"}>medium</option>
                            <option value={"hard"}>hard</option>
                          </select>
                        </div>
                        <div className="flex items-center w-full mb-4">
                          <span className="h-10 font-bold inline-flex items-center py-2.5 px-4 text-sm text-center text-gray-900 border border-gray-300 rounded-l-lg bg-pink-100">
                            Category type
                          </span>
                          <select
                            {...register("type")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option value={"FE"}>FE</option>
                            <option value={"BE"}>BE</option>
                            <option value={"DO"}>DO</option>
                          </select>
                        </div>
                        <div className="flex items-center w-full mb-4">
                          <span className="h-10 font-bold inline-flex items-center py-2.5 px-4 text-sm text-center text-gray-900 border border-gray-300 rounded-l-lg bg-pink-100">
                            Group name
                          </span>
                          <select
                            {...register("group")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            {groups.map((group: any) => (
                              <option key={group._id} value={group._id}>
                                {group.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Instructor */}
      {loginData?.role == "Instructor" && (
        <div className="flex flex-col lg:flex-row justify-between gap-4 container mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full lg:w-1/2">
            <div
              className="flex flex-col items-center justify-center rounded-xl py-9 px-8 border-2 border-gray-300 text-center h-40 bg-white shadow-md w-full md:w-1/2"
              onClick={handleOpenModal}
            >
              <img src={quizIcon} alt="quiz icon" className=" mb-3 pt-2" />
              <p className="font-bold text-lg">Set up a new quiz</p>
            </div>
            <Link
              to="/dashboard/questions"
              className="flex flex-col items-center justify-center rounded-xl py-4 px-8 border-2 border-gray-300 text-center h-40 bg-white shadow-md w-full md:w-1/2"
            >
              <img
                src={questionBank}
                alt="question icon"
                className="pt-5 mb-2"
              />
              <p className="font-bold text-lg mb-3 mt-2">Question Bank</p>
            </Link>
          </div>
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="border p-4 rounded bg-white shadow-md">
              <h6 className="font-bold text-lg mb-4">Upcoming quizes</h6>
              {upCommingQuiz.length > 0 ? (
                upCommingQuiz.map(
                  (quiz: any, index) =>
                    index < 2 && (
                      <div key={index}>
                        <UpCommingQuizes quiz={quiz} />
                      </div>
                    )
                )
              ) : (
                <div className="w-full flex justify-center items-center h-52">
                  <Loading />
                </div>
              )}
            </div>
            <div className="border p-5 rounded bg-white shadow-md flex flex-col w-full">
              <div className="flex justify-between">
                <div className="font-bold text-[1.2em] mb-3">
                  Completed Quizes
                </div>
                <Link to="/dashboard/results">
                  <div className="flex items-center gap-2">
                    <div>Results</div>
                    <FaArrowRight className="w-4 h-4 text-green-600" />
                  </div>
                </Link>
              </div>
              <CompletedQuizes />
            </div>
          </div>
        </div>
      )}
      {/* student */}
      {/* Join Quiz Modal */}
      {showJoinQuiz && loginData?.role == "Student" ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="w-auto my-6 mx-auto  ">
              <div className="border-0 rounded-lg shadow-lg  flex flex-col  bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start ">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
                        <h3 className="text-center font-bold text-2xl">
                          Join Quiz{" "}
                        </h3>
                        <h3 className="text-center font-bold text-lg mt-5">
                          Input the code received for the quiz below to join
                        </h3>
                      </div>
                    </div>
                    <form
                      id="groupForm"
                      className="max-w-sm mx-auto my-5 relative"
                      onSubmit={handleSubmit(onSubmitCode)}
                    >
                      <div className="relative mb-4">
                        <button
                          id="dropdown-phone-button"
                          className="absolute top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100"
                          type="button"
                        >
                          Code
                        </button>
                        <input
                          type="text"
                          className="block border-2 w-full h-10 pl-28 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          {...register("code", { required: true })}
                        />
                      </div>
                      <div className="flex items-center justify-center mt-10">
                        <button
                          type="submit"
                          form="groupForm"
                          className="border-2 rounded-lg inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          <CheckIcon className="h-7 w-7" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center  border-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                          onClick={() => setShowJoinQuiz(false)}
                        >
                          <XMarkIcon className="h-7 w-7" />
                        </button>
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
      {loginData?.role == "Student" && (
        <div
          className="flex flex-col items-center justify-center rounded-xl py-9 px-8 border-2 border-gray-300 text-center h-40 bg-white shadow-md w-full md:w-52"
          onClick={handleOpenJoinQuiz}
        >
          <img src={quizIcon} alt="quiz icon" className="mb-3 pt-2" />
          <p className="font-bold text-lg text-center">Join Quiz</p>
        </div>
      )}
      {loginData?.role == "Student" && (
        <div className="flex flex-col xl:flex-row gap-6 mt-6">
          <div className="border p-4 rounded bg-white shadow-md w-full xl:w-1/2">
            <h6 className="font-bold text-lg mb-4">Upcoming quizes</h6>
            {upCommingQuiz.length > 0 &&
              upCommingQuiz.map(
                (quiz: any, index) =>
                  index < 2 && (
                    <div key={index}>
                      <UpCommingQuizes quiz={quiz} />
                    </div>
                  )
              )}
            {loginData?.role == "Student" && upCommingQuiz.length == 0 && (
              <div className="text-lg font-bold flex justify-center items-center h-52">
                <div>No Upcomming Quizes</div>
              </div>
            )}
          </div>
          <div className="border p-5 rounded bg-white shadow-md w-full xl:w-1/2 flex flex-col">
            <div className="flex justify-between mb-3">
              <div className="font-bold text-[1.2em]">Completed Quizes</div>
              <Link to="/dashboard/results">
                <div className="flex items-center gap-2">
                  <div>Results</div>
                  <FaArrowRight className="w-4 h-4 text-green-600" />
                </div>
              </Link>
            </div>
            <CompletedQuizes />
          </div>
        </div>
      )}
    </>
  );
};

export default QuizList;
