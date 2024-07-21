import { FaArrowCircleRight } from "react-icons/fa";
import userImg from "../../../../assets/user img.png";

export const StudentCard = ({ student }: any) => {
  return (
    <div className="bg-white border-2 rounded-lg flex flex-col md:flex-row justify-between items-center p-4">
      <div className="flex gap-3 flex-col md:flex-row items-center md:items-start ">
        <img src={userImg} alt="user" className="w-24 rounded-lg border-2" />
        <div className="px-2 text-center md:text-left">
          <h2 className="text-md font-semibold mt-2">{student.first_name}</h2>
          <p className="text-gray-700 text-sm">{student.email}</p>
        </div>
      </div>
      <div className="pt-3 pr-2 md:pt-0 md:pr-0">
        <FaArrowCircleRight className="text-[1.5em]" />
      </div>
    </div>
  );
};
