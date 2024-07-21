import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../../../ReduxSystem/slices/groupDataSlice";
import { getAllStudents } from "../../../../ReduxSystem/slices/studentsSlice";
import { StudentCard } from "../StudentCard/StudentCard";

const StudentsList = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [firstGroup, setFirstGroup] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [showFirstGroup, setShowFirstGroup] = useState(true);
  const { students } = useSelector((state: any) => state.studentsData);
  const { groups } = useSelector((state: any) => state.groupsData);

  const dispatch = useDispatch();

  const handleShowStudents = (group: any) => {
    const studentsIds = group.students;
    const filteredStudents = students.filter((re: any) => {
      return studentsIds.some((studentId: any) => re._id === studentId);
    });
    setFilteredStudents(filteredStudents);
    const showFirstStudents: any = groupsList.map((student: any) => {
      if (student._id === group._id) {
        setShowStudents(true);
        setShowFirstGroup(false);
        return { ...student, showFirstGroup: true };
      } else {
        return { ...student, showFirstGroup: false };
      }
    });
    setGroupsList(showFirstStudents);
  };

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllStudents());
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const firstGroup = groups[0].students;
      const firstGroupStudents = students.filter((re: any) => {
        return firstGroup.some((studentId: any) => re._id === studentId);
      });
      setFirstGroup(firstGroupStudents);
      const showGroups = groups.map((student: any) => {
        return { ...student, showFirstGroup: false };
      });
      setGroupsList(showGroups);
    }
  }, [students]);

  if (groupsList.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-end justify-end px-3 container mx-auto">
        <div className="flex border-2 rounded-3xl px-3 py-2 gap-2">
          <button className="text-sm sm:text-lg font-bold">
            Students Without Group
          </button>
        </div>
      </div>
      {showStudents && filteredStudents.length == 0 && (
        <div>
          {" "}
          <div className="w-full flex justify-center items-center h-52">
            <div className="flex flex-col justify-center items-center">
              <svg
                className="animate-spin h-10 w-10 text-gray-600 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
      <div className="border border-gray-200 rounded-md p-5 mt-5 container mx-auto">
        <h6 className="font-lg mb-5 text-center md:text-start ">
          Students list
        </h6>
        <div className="flex flex-wrap gap-2 flex-col md:flex-row items-center">
          {groupsList.map(
            (group: any, index) =>
              index == 0 && (
                <div key={group._id}>
                  {index == 0 && (
                    <button
                      className={
                        group.showFirstGroup || showFirstGroup
                          ? "bg-[#0D1321] py-2 px-10 rounded-3xl text-white"
                          : "bg-white-900 py-2 px-10 rounded-3xl border-2"
                      }
                      onClick={() => handleShowStudents(group)}
                    >
                      {group.name}
                    </button>
                  )}
                </div>
              )
          )}
          {groupsList.map((group: any, index) => (
            <div key={group._id}>
              {index > 0 && (
                <button
                  className={
                    group.showFirstGroup && !showFirstGroup
                      ? "bg-[#0D1321]  py-2 px-10 rounded-3xl text-white"
                      : "bg-white-900 py-2 px-10 rounded-3xl border-2"
                  }
                  onClick={() => handleShowStudents(group)}
                >
                  {group.name}
                </button>
              )}
            </div>
          ))}
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-3">
            {showStudents &&
              firstGroup.length != 0 &&
              filteredStudents.map((student: any) => (
                <div key={student._id}>
                  <div>
                    <StudentCard student={student} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-3">
          {!showStudents &&
            firstGroup.map((student: any) => (
              <div key={student._id}>
                <StudentCard student={student} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default StudentsList;
