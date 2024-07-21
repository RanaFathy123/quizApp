import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import useQuizList from "../../../../hooks/useQuizList";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstace";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getAllGroups } from "../../../../ReduxSystem/slices/groupDataSlice";

const QuizModal = () => {
  const {
    completedQuizes,
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
    setShowModal,
    handleChangeDate,
    showQuizCodeModal,
    setShowQuizCodeModal,
    onSubmit
  } = useQuizList();

  return (
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
  );
};

export default QuizModal;
