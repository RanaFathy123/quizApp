import { format } from "date-fns";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import quizImg from "../../../../assets/quiz img.png";
import { useSelector } from "react-redux";
const UpCommingQuizes = ({ quiz }: any) => {
  const { loginData } = useSelector((state: any) => state.login);

  return (
    <div className="border rounded-xl flex flex-col lg:flex-row mb-4 p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-center h-32 w-32 lg:h-36 lg:w-36  rounded-xl mr-4 mb-4 lg:mb-0 bg-[#FFEDDF]">
        <img
          src={quizImg}
          alt="quiz"
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
      <div className="flex-grow">
        <p className="font-bold text-lg text-gray-800">{quiz.title}</p>
        <span className="text-gray-500">
          {format(new Date(quiz.schadule), "dd / MM / yyyy hh:mm a")}
        </span>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-gray-700">
            No. of students enrolled: {quiz.participants}
          </p>
          <Link
            to={
              loginData?.role == "Instructor"
                ? `/dashboard/quizes/${quiz._id}`
                : `/dashboard/quiz/student/${quiz._id}`
            }
          >
            <div className="flex items-center text-green-600">
              <span className="font-bold">{quiz.status}</span>
              <div className="bg-green-600 rounded-full p-1 ml-2 text-white flex items-center justify-center">
                <FaArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpCommingQuizes;
