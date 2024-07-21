import { FaArrowRight } from "react-icons/fa";

import { Link } from "react-router-dom";
import useDashboard from "../../../hooks/useDashboard";
import useQuizList from "../../../hooks/useQuizList";
import Loading from "../../SharedModules/components/Loading/Loading";
import UpCommingQuizes from "../../SharedModules/components/UpCommingQuizing/UpCommingQuizes";
import { StudentCard } from "../../StudentsModule/components/StudentCard/StudentCard";

const Dashboard = () => {
  const { upCommingQuiz } = useQuizList();
  const { topFiveStudents } = useDashboard();
 
  return (
    <div className="flex lg:justify-between gap-4 xl:flex-row flex-col justify-center items-center xl:items-start container mx-auto">
      <div className="border p-5 rounded bg-white  xl:w-1/2 w-full">
        <div className="flex justify-between">
          <h6 className="font-bold text-lg mb-4">Upcoming quizes</h6>
          <Link to="/dashboard/results">
            <div className="flex items-center gap-2">
              <div>Quiz directory</div>
              <FaArrowRight className="w-4 h-4 text-green-600" />
            </div>
          </Link>
        </div>
        {upCommingQuiz.length > 0 ? (
          upCommingQuiz.map((quiz: any) => (
            <div key={quiz._id}>
              <UpCommingQuizes quiz={quiz} />
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center h-screen">
            <Loading />
          </div>
        )}
      </div>
      <div className="border border-gray-200 rounded-md p-5  xl:w-1/2 w-full">
        <div className="flex justify-between">
          <h6 className="font-bold text-lg ">Top 5 Students</h6>
          <Link to="/dashboard/students">
            <div className="flex items-center gap-2">
              <div>All Students</div>
              <FaArrowRight className="w-4 h-4 text-green-600" />
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 flex-col md:flex-row">
          <div className="grid grid-cols-1  gap-4 mt-3 w-full">
            {topFiveStudents.map((student: any) => (
              <div key={student._id}>
                <div className="w-full">
                  <StudentCard student={student} />
                </div>
              </div>
            ))}
            {topFiveStudents.length == 0 && (
              <div className="w-full flex justify-center items-center h-screen">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
