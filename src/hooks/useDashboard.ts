import { useEffect } from "react";
import { getAllStudents } from "../ReduxSystem/slices/studentsSlice";
import { useDispatch, useSelector } from "react-redux";

const useDashboard = () => {
  const { students } = useSelector((state: any) => state.studentsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  const topFiveStudents = students
    .filter((student: any) => {
      return student.avg_score;
    })
    .sort((a: any, b: any) => b.avg_score - a.avg_score)
    .slice(0, 5);
  return {
    topFiveStudents
  }
}

export default useDashboard