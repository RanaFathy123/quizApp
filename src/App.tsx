import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveLoginData } from "./ReduxSystem/slices/loginDataSlice";
import Dashboard from "./modules/DashboardModule/components/Dashboard";
import GroupsList from "./modules/GroupsModule/components/GroupsList/GroupsList";
import AuthLayout from "./modules/SharedModules/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/SharedModules/components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModules/components/NotFound/NotFound";
import ProtectedRoute from "./modules/SharedModules/components/ProtectedRoute/ProtectedRoute";
import ChangePass from "./modules/authModule/components/ChangePass/ChangePass";
import ForgetPass from "./modules/authModule/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/authModule/components/ResetPass/ResetPass";
import SignInSignUp from "./modules/authModule/components/SignInSignUp/SignInSignUp";
import StudentsList from "./modules/StudentsModule/components/StudentsList/StudentsList";
import QuestionsList from "./modules/QuestionsModule/components/QuestionsList/QuestionsList";
import QuizList from "./modules/QuizModule/components/QuizList/QuizList";
import ResultsList from "./modules/ResultModules/components/ResultsList/ResultsList";
import PrivateRoute from "./modules/SharedModules/components/PrivateRoute/PrivateRoute";
import QuizData from "./modules/QuizModule/components/QuizData/QuizData";
import QuizResults from "./modules/ResultModules/components/QuizResults/QuizResults";
import StudentQuiz from "./modules/StudentQuizModule/components/StudentQuiz/StudentQuiz";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state: any) => state.login);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(saveLoginData());
    }
  }, []);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <AuthLayout />
        </PrivateRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: <SignInSignUp />,
        },
        {
          path: "login",
          element: <SignInSignUp />,
        },
        {
          path: "signup",
          element: <SignInSignUp />,
        },
        {
          path: "forget-password",
          element: <ForgetPass />,
        },
        {
          path: "reset-password",
          element: <ResetPass />,
        },
        {
          path: "change-password",
          element: <ChangePass />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element:
            loginData?.role == "Instructor" ? <Dashboard /> : <NotFound />,
        },
        {
          path: "groups",
          element: <GroupsList />,
        },
        {
          path: "quizes",
          element: <QuizList />,
        },
        {
          path: "quizes/:id",
          element: <QuizData />,
        },
        {
          path: "students",
          element: <StudentsList />,
        },
        {
          path: "questions",
          element: <QuestionsList />,
        },
        {
          path: "results",
          element: <ResultsList />,
        },
        {
          path: "quizes/results/:id",
          element: <QuizResults />,
        },
        {
          path: "quiz/student/:id",
          element: <StudentQuiz />,
        },
      ],
    },
  ]);

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
