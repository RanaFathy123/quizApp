import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllStudents } from "../../../../ReduxSystem/slices/studentsSlice";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstace";
import GroupCard from "../GroupCard/GroupCard";
import { getAllGroups } from "../../../../ReduxSystem/slices/groupDataSlice";
import { FormValues, student } from "../../../../types/types";
import Loading from "../../../SharedModules/components/Loading/Loading";

const GroupsList: React.FC = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupID, setGroupID] = useState("");
  const [studentList, setStudentList] = useState<student[]>([]);
  const [isUpdate, setIsUpdate] = useState(true);
  const [values, setValues] = useState<{}[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [studentsIds, setStudentsIds] = useState([]);
  const [studentsValues, setStudentsValues] = useState([]);
  const { groups } = useSelector((state: any) => state.groupsData);
  const { students } = useSelector((state: any) => state.studentsData);
  const { loginData } = useSelector((state: any) => state.login);

  const dispatch = useDispatch();

  const { handleSubmit } = useForm<FormValues>();

  const handleOpenModal = () => {
    setIsUpdate(false);
    if (!isUpdate) {
      setStudentsValues([]);
    }
    setShowModal(true);
    setGroupName("");
    setValues([]);
  };
  const handleOpeningDelete = (id: string) => {
    setGroupID(id);
    setOpenDelete(true);
  };

  const handleClosingDelete = () => {
    setOpenDelete(false);
  };

  const handleUpdate = (group: any) => {
    setShowModal(true);
    setIsUpdate(true);
    setGroupID(group._id);
    const studentsIds = group.students;
    setStudentsIds(studentsIds);
    setGroupName(group.name);
  };

  const onSubmit: SubmitHandler<FormValues> = async () => {
    if (!isUpdate) {
      try {
        const response = await axiosInstanceWithHeaders.post("/group", {
          name: groupName,
          students: values,
        });
        dispatch(getAllGroups());
        setShowModal(false);
        toast.success(response?.data?.message || "Record created successfully");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "There's an error");
      }
    } else if (isUpdate) {
      try {
        const response = await axiosInstanceWithHeaders.put(
          `/group/${groupID}`,
          {
            name: groupName,
            students: values,
          }
        );
        dispatch(getAllGroups());
        setShowModal(false);
        toast.success(response?.data?.message || "Record created successfully");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "There's an error");
      }
    }
  };

  const deletingGroup = async () => {
    try {
      const response = await axiosInstanceWithHeaders.delete(
        `/group/${groupID}`
      );
      dispatch(getAllGroups());
      handleClosingDelete();
      getAllWithoutgroup();
      toast.success(response?.data?.message || "Group deleted successfully");
    } catch (error: any) {
      console.log(error);
      toast.success(error?.response?.data?.message || "There's an error");
    }
  };

  async function getAllWithoutgroup() {
    try {
      const response = await axiosInstanceWithHeaders.get(
        "/student/without-group"
      );
      const studentes = response.data;
      const result = studentes.map((student: any) => {
        return { id: student.first_name, name: student._id };
      });
      setStudentList(result);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (value: any) => {
    const id = value.map((value: any) => {
      return value.name;
    });
    setValues(id);
  };
  const filterStudents = () => {
    const filteredStudents = students.filter((re: any) => {
      return studentsIds.some((studentId) => re._id === studentId);
    });

    const filteredstudentsValues = filteredStudents.map((student: any) => {
      return { id: student.first_name, name: student._id };
    });
    if (isUpdate) {
      setStudentsValues(filteredstudentsValues);
    }
  };
  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getAllGroups());
  }, [loginData]);

  useEffect(() => {
    getAllWithoutgroup();
    filterStudents();
  }, [studentsIds, students,loginData]);

  return (
    <div>
      {/* Add Modal */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="w-auto my-6 mx-auto  ">
              <div className="border-0 rounded-lg shadow-lg  flex flex-col  bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start border-b border-gray-400">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
                        <h3>
                          {isUpdate ? "Update Group" : "Set up a new Group"}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="submit"
                          form="groupForm"
                          className="border-s border-gray-400 rounded-none inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setShowModal(false)}
                          type="button"
                          className="inline-flex justify-center border-s border-gray-400 rounded-none px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <form
                      id="groupForm"
                      className="max-w-sm mx-auto my-5 relative"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="relative mb-4">
                        <button
                          id="dropdown-phone-button"
                          className="absolute top-0 left-0 h-10 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100"
                          type="button"
                        >
                          Group Name
                        </button>
                        <input
                          type="text"
                          className="block border-2 h-10 w-full pl-32 p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center ">
                        <button
                          id="dropdown-students-button"
                          className="lg:py-2.5  !min-h-10 px-4 text-sm font-medium text-gray-900 border border-gray-300 rounded-s-lg bg-pink-100"
                          type="button"
                        >
                          List Students
                        </button>
                        <Select
                          className="md:!min-w-64 md:!min-h-10"
                          options={studentList}
                          labelField="id"
                          valueField="name"
                          multi
                          onChange={(value) => handleChange(value)}
                          values={isUpdate ? studentsValues : values}
                          searchable
                        />
                      </div>
                    </form>
                  </div>
                </div>
                {/*body*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
      <div className="container mx-auto p-4">
        {/* Delete Modal */}
        <Dialog open={openDelete} onClose={handleClosingDelete}>
          <DialogBackdrop className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start border-b border-gray-400">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Delete Group
                      </DialogTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={deletingGroup}
                        type="button"
                        className="border-s border-gray-400 rounded-none inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleClosingDelete}
                        type="button"
                        className="border-s border-gray-400 rounded-none inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
        <div className="flex justify-end mb-4">
          <button
            className="rounded-full border border-gray-400 border-1 px-4 py-2"
            onClick={handleOpenModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Group
          </button>
        </div>
        <div className="border border-gray-200 rounded-md p-5">
          <h6 className="font-lg mb-5">Groups list</h6>
          {groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4">
              {groups.map((group: any) => (
                <GroupCard
                  key={group._id}
                  group={group}
                  handleOpeningDelete={handleOpeningDelete}
                  handleUpdate={handleUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center h-screen">
           <Loading/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsList;
