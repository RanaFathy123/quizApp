import { useNavigate, useParams } from "react-router-dom";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstace";
import { useEffect, useState } from "react";
import Loading from "../../../SharedModules/components/Loading/Loading";
import { toast } from "react-toastify";
import successImg from "../../../../assets/success img.png";
import failedImg from "../../../../assets/failed img.png";
import quizTest from '../../../../assets/quiz test.png'

const StudentQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [submitScore, setSubmitScore] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();

  const getQuestionsWithOutAnswers = async () => {
    try {
      const response = await axiosInstanceWithHeaders.get(
        `/quiz/without-answers/${id}`
      );
      const questionsWithOutAnswers = response.data.data.questions;
      const scorePerQuestions = response.data.data.score_per_question;
      const totalScore = questionsWithOutAnswers.length * scorePerQuestions;
      setTotalScore(totalScore);
      const quizTitle = response.data.data.title;
      setQuizTitle(quizTitle);
      setQuestions(questionsWithOutAnswers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuestionsWithOutAnswers();
  }, []);
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const handleResult = (value: any, question: any) => {
    const newAnswer = {
      question: question._id,
      answer: value,
    };
    setAnswers([...answers, newAnswer]);
    setTimeout(() => {
      handleNextQuestion();
    }, 200);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstanceWithHeaders.post(
        `/quiz/submit/${id}`,
        {
          answers: answers,
        }
      );
      const score = response.data.data.score;
      setShowResult(true);
      setSubmitScore(score);
    } catch (err) {
      console.log(err);
      toast.error("You Have Submitted Before");
   
      navigate("/dashboard/quizes");
    }
  };

  if (questions.length == 0) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center xl:flex-row w-full">
      {!showResult &&<img src={quizTest} alt="quiz img" className="mb-4 rounded-lg" />}

      <div
        className="max-w-md mx-auto bg-white p-8 rounded-md shadow-lg"
       
      >
        {!showResult && (
          <h1 className="text-3xl font-bold mb-6  text-green-400 text-center text-success">
            Quiz App
          </h1>
        )}
        {!showResult && (
          <h3 className="text-2xl font-bold mb-6 text-center">{quizTitle}</h3>
        )}
        {!showResult && (
          <form
            id="quizForm"
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* Question 1 */}
            <div className="flex flex-col mb-4">
              <label htmlFor="q1" className="text-lg text-gray-800 mb-2">
                {questions.map(
                  (question: any, index) =>
                    index == currentIndex && (
                      <div key={index}>
                        <h3 className="mb-3">{question.title}</h3>
                        <div className="flex items-center space-x-4">
                          <input
                            type="radio"
                            id="q1b"
                            defaultValue="A"
                            className="mr-2"
                            required
                            onChange={(e) =>
                              handleResult(e.target.value, question)
                            }
                          />
                          <label htmlFor="q1b" className="text-gray-700">
                            a) {question.options.A}
                          </label>
                        </div>
                        <div className="flex items-center space-x-4">
                          <input
                            type="radio"
                            id="q1b"
                            defaultValue="B"
                            className="mr-2"
                            required
                            onChange={(e) =>
                              handleResult(e.target.value, question)
                            }
                          />
                          <label htmlFor="q1b" className="text-gray-700">
                            b){question.options.B}
                          </label>
                        </div>
                        <div className="flex items-center space-x-4">
                          <input
                            type="radio"
                            id="q1c"
                            defaultValue="C"
                            className="mr-2"
                            required
                            onChange={(e) =>
                              handleResult(e.target.value, question)
                            }
                          />
                          <label htmlFor="q1c" className="text-gray-700">
                            c) {question.options.C}
                          </label>
                        </div>
                        <div className="flex items-center space-x-4">
                          <input
                            type="radio"
                            id="q1d"
                            defaultValue="D"
                            className="mr-2"
                            required
                            onChange={(e) =>
                              handleResult(e.target.value, question)
                            }
                          />
                          <label htmlFor="q1d" className="text-gray-700">
                            d){question.options.D}
                          </label>
                        </div>
                      </div>
                    )
                )}
              </label>
            </div>
            <hr />
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600  text-white px-2 py-1 rounded-md"
                onClick={handlePreviousQuestion}
              >
                Previous
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-1 rounded-md"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </div>
            <hr />
            <button
              type="submit"
              className="bg-green-500 mx-auto block text-white px-4 py-2 rounded-md mt-8"
            >
              Submit
            </button>
          </form>
        )}

        {showResult && (
          <div
            id="result"
            className="mt-8 flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4 text-indigo-600 ">
              Quiz Result
            </h2>
            {submitScore > totalScore / 2 && (
              <div>
                <img
                  src={successImg}
                  alt="success img"
                  className="mb-4 rounded-lg"
                />
              </div>
            )}
            {submitScore < totalScore / 2 && (
              <div>
                <img
                  src={failedImg}
                  alt="success img"
                  className="mb-4 rounded-lg"
                />
              </div>
            )}
            <p
              id="score"
              className="text-xl font-semibold mb-2 text-green-500 animate-bounce"
            >{`Your Score Is ${submitScore} from ${totalScore}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentQuiz;
