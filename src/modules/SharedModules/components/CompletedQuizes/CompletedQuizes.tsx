import { format } from "date-fns";
import useCompletedQuizesWithGroups from "../../../../hooks/useCompletedQuizesWithGroups";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";

const CompletedQuizes = () => {
  const { completedQuizWithGroups } = useCompletedQuizesWithGroups();
  const { loginData } = useSelector((state: any) => state.login);

  return (
    <section className="container mx-auto font-mono  max-w-52 lg:max-w-full lg:w-full md:max-w-full mb-5">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-2 text-left bg-[#0D1321] text-white">
                <th className="py-2 px-4 border-2">Title</th>
                {loginData?.role == "Instructor" && (
                  <th className="py-2 px-4 border-2">Group name</th>
                )}
                {loginData?.role == "Instructor" && (
                  <th className="py-2 px-4 border-2">
                    No. of persons in group
                  </th>
                )}
                <th className="py-2 px-4 border-2">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {completedQuizWithGroups.map((completeQuiz: any, index) => (
                <tr key={index}>
                  <td className="py-2 px-2 border-2 ">{completeQuiz?.title}</td>
                  {loginData?.role == "Instructor" && (
                    <td className="py-2 px-2 border-2 ">
                      {completeQuiz?.filteredGroups.length > 0
                        ? completeQuiz?.filteredGroups.map(
                            (group: any) => group.name
                          )
                        : "No Group"}
                    </td>
                  )}
                  {loginData?.role == "Instructor" && (
                    <td className="py-2 px-2 border-2 ">
                      {completeQuiz?.filteredGroups.length > 0
                        ? completeQuiz?.filteredGroups.map(
                            (group: any) => group.students.length
                          )
                        : "0"}
                    </td>
                  )}
                  <td className="py-2 px-2 border-2 w-36">
                    {format(new Date(completeQuiz.schadule), "dd / MM / yyyy")}
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
    </section>
  );
};

export default CompletedQuizes;
