import { useEffect } from "react";
import { getAllGroups } from "../ReduxSystem/slices/groupDataSlice";
import { useDispatch, useSelector } from "react-redux";
import useQuizList from "./useQuizList";

const useCompletedQuizesWithGroups = () => {
  const { completedQuizes } = useQuizList();
  const { groups } = useSelector((state: any) => state.groupsData);

  const { loginData } = useSelector((state: any) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGroups());
  }, [loginData]);

  const completedQuizWithGroups = completedQuizes.map((completeQuiz: any) => {
    
    const filteredGroups = groups.filter((group: any) => {
      return group._id == completeQuiz.group;
    });
    return {
      ...completeQuiz,
      filteredGroups: filteredGroups,
    };
  });

  return {
    completedQuizWithGroups,
  };
};

export default useCompletedQuizesWithGroups;
