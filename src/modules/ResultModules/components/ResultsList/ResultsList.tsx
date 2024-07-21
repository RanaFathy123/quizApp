import { format } from "date-fns";
import { Link } from "react-router-dom";
import useCompletedQuizesWithGroups from "../../../../hooks/useCompletedQuizesWithGroups";
import Loading from "../../../SharedModules/components/Loading/Loading";
import { useSelector } from "react-redux";
const ResultsList = () => {
  const { completedQuizWithGroups } = useCompletedQuizesWithGroups();
  const { loginData } = useSelector((state: any) => state.login);

  return (
    <div className="max-w-full overflow-x-auto shadow-lg  md:w-full w-80 container mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto md:w-full w-80 container mx-auto">
        <h2 className="text-xl font-semibold mb-4">Completed Quizes</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-[#0D1321] text-center text-white">
            <tr>
              <th className="py-2 px-4 border-2">Title</th>
              {loginData?.role == "Instructor" && (
                <th className="py-2 px-4 border-2">Group name</th>
              )}
              {loginData?.role == "Instructor" && (
                <th className="py-2 px-4 border-2">No. of persons in group</th>
              )}
              <th className="py-2 px-4 border-2">Participants</th>
              <th className="py-2 px-4 border-2">Date</th>
              <th className="py-2 px-4 border-2"></th>
            </tr>
          </thead>
          <tbody>
            {completedQuizWithGroups.map((completeQuiz: any, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-2 text-center">
                  {completeQuiz?.title}
                </td>
                {loginData?.role == "Instructor" && (
                  <td className="py-2 px-4 border-2 text-center">
                    {completeQuiz?.filteredGroups.length > 0
                      ? completeQuiz?.filteredGroups.map(
                          (group: any) => group.name
                        )
                      : "No Group"}
                  </td>
                )}
                {loginData?.role == "Instructor" && (
                  <td className="py-2 px-4 border-2 text-center">
                    {completeQuiz?.filteredGroups.length > 0
                      ? completeQuiz?.filteredGroups.map(
                          (group: any) => group.students.length
                        )
                      : "0"}
                  </td>
                )}
                <td className="py-2 px-4 border-2 text-center">
                  {completeQuiz.participants}
                </td>
                <td className="py-2 px-4 border-2 text-center w-44">
                  {format(new Date(completeQuiz.schadule), "dd / MM / yyyy")}
                </td>

                <td className="py-2 px-4 border-2 text-center">
                  <Link to={`/dashboard/quizes/results/${completeQuiz._id}`}>
                    <button className="bg-green-300 px-7 py-1 rounded-xl">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {completedQuizWithGroups.length == 0 && (
          <div className="w-full flex justify-center items-center h-52">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsList;
