import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstace";
import Loading from "../../../SharedModules/components/Loading/Loading";
import { useSelector } from "react-redux";

const QuizResults = () => {
  const [quizResults, setQuizResults] = useState<any>([]);
  const { loginData } = useSelector((state: any) => state.login);
  const { id } = useParams();

  const getQuizResults = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get("/quiz/result");
      const resultsData = response.data;
      const quizResultsData = resultsData.filter((result: any) => {
        return result.quiz._id == id;
      });
      setQuizResults(quizResultsData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuizResults();
  }, [id]);

  if (loginData?.role == "Student") {
    return (
      <>
        {quizResults && quizResults.length > 0 && (
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
                Data structures {quizResults[0]?.quiz.title}
              </span>
            </div>
          </div>
        )}
        <div className="bg-white shadow-md rounded-lg p-6  overflow-x-auto w-1/2 container me-auto">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-[#0D1321] text-center text-white">
              <tr>
                <th className="py-2 px-4 border-2">Student name</th>
                <th className="py-2 px-4 border-2">Score</th>
                <th className="py-2 px-4 border-2">Time submitted</th>
              </tr>
            </thead>
            <tbody>
              {quizResults &&
                quizResults.length > 0 &&
                quizResults.map((quizResult: any, index: number) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-2 text-center">
                      {quizResult.result?.participant?.first_name}
                    </td>
                    <td className="py-2 px-4 border-2 text-center">
                      {quizResult.result?.score}
                    </td>
                    <td className="py-2 px-4 border-2 text-center">
                      {" "}
                      {quizResult.result?.finished_at
                        ? format(
                            new Date(quizResult.result?.finished_at),
                            "hh:mm a"
                          )
                        : "No schedule available"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="text-lg font-bold flex h-52 justify-center items-center">
            {quizResults.length == 0 && "No Results"}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {quizResults && quizResults.length > 0 && (
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
              Data structures {quizResults[0]?.quiz.title}
            </span>
          </div>
        </div>
      )}
      <div>
        <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto w-1/2 container me-auto">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-[#0D1321] text-center text-white">
              <tr>
                <th className="py-2 px-4 border-2">Student name</th>
                <th className="py-2 px-4 border-2">Score</th>
                <th className="py-2 px-4 border-2">Time submitted</th>
              </tr>
            </thead>
            <tbody>
              {quizResults &&
                quizResults.length > 0 &&
                quizResults[0].participants.length > 0 &&
                quizResults[0].participants.map(
                  (participant: any, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-2 text-center">
                        {participant.participant.first_name}
                      </td>
                      <td className="py-2 px-4 border-2 text-center">
                        {participant.score}
                      </td>
                      <td className="py-2 px-4 border-2 text-center">
                        {participant.finished_at
                          ? format(new Date(participant.finished_at), "hh:mm a")
                          : "No schedule available"}
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          {quizResults.length > 0 &&
            quizResults[0].participants.length === 0 && (
              <div className="w-full flex justify-center items-center h-screen text-lg font-bold">
                No Participants In This Quiz
              </div>
            )}
          {quizResults.length === 0 && (
            <div className="w-full flex justify-center items-center h-screen">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizResults;
