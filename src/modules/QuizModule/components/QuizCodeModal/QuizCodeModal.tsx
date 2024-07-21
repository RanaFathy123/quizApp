import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { GrStatusGood } from "react-icons/gr";

const QuizCodeModal = ({ setShowQuizCodeModal, quizCode }: any) => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quizCode).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 1500);
        setTimeout(() => setShowQuizCodeModal(false), 1500);
      },
      () => {
        setCopySuccess("Failed to copy!");
      }
    );
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="w-auto mx-auto">
          <div className="border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <div className="bg-white px-4 sm:p-6 sm:pb-4">
                <form id="groupForm" className="max-w-sm mx-auto my-5 relative">
                  <GrStatusGood className="mx-auto font-bold text-[4em]" />
                  <div className="text-center font-bold my-3 w-full">
                    Quiz was successfully created
                  </div>
                  <div className="relative mb-4">
                    <button
                      id="dropdown-phone-button"
                      className="absolute font-bold rounded-l-full top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm text-gray-900 border border-gray-300 bg-pink-100"
                      type="button"
                    >
                      Code
                    </button>
                    <input
                      type="text"
                      className="block rounded-3xl border-2 h-10 w-full pl-32 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      value={quizCode}
                      readOnly
                    />
                    <FiCopy
                      className="absolute top-1/2 right-3 transform -translate-y-1/2  cursor-pointer"
                      size={20}
                      onClick={copyToClipboard}
                    />
                  </div>
                  {copySuccess && (
                    <div className="text-center text-green-500 text-sm mb-2">
                      {copySuccess}
                    </div>
                  )}
                </form>
                <button
                  className="mx-auto block bg-green-300 rounded-2xl px-10 py-1"
                  onClick={() => setShowQuizCodeModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default QuizCodeModal;
