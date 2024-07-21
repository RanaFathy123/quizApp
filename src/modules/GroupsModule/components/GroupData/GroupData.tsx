import Select from "react-dropdown-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstace";
import { getAllStudents } from "../../../../ReduxSystem/slices/studentsSlice";

const GroupData = () => {
  const [values, setValues] = useState<{}[]>([]);
  const [groupName, seGroupName] = useState("");
  const [allStudents, setStudents] = useState([]);
  const [test, setTest] = useState([]);
  const { handleSubmit } = useForm();
  const [isUpdate, setIsUpdate] = useState(true);
  const { loginData } = useSelector((state: any) => state.login);
  const { students } = useSelector((state: any) => state.studentsData);
  const dispatch = useDispatch();

  const handleChange = (value: any) => {
    const id = value.map((value: any) => {
      return value.name;
    });
    setValues(id);
  };

  const onSubmit = async () => {
    try {
      const response = await axiosInstanceWithHeaders.post("/group", {
        name: groupName,
        students: values,
      });
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  const getStudentsWithoutGroup = async () => {
    const response = await axiosInstanceWithHeaders.get(
      "/student/without-group"
    );

    const studentes = response.data;
    const result = studentes.map((student: any) => {
      return { id: student.first_name, name: student._id };
    });

    setStudents(result);
    const test = ["667eede2c85f1ecdbc272def", "667f36f4c85f1ecdbc2752a9"];

    const final = students.filter((re: any) => {
      return test.some((testId) => re._id === testId);
    });

    const finalResult = final.map((student: any) => {
      return { id: student.first_name, name: student._id };
    });
    setTest(finalResult);
    console.log(finalResult);
    const id = finalResult.map((res: any) => {
      return res.name;
    });
  };
  
  useEffect(() => {
    getStudentsWithoutGroup();
  }, [students]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-60">
        <button>submit</button>
        <input
          type="text"
          className="mb-3 w-full"
          value={groupName}
          onChange={(e) => seGroupName(e.target.value)}
        />
        <Select
          placeholder="Students List"
          options={allStudents}
          labelField="id"
          valueField="name"
          multi
          onChange={(value) => handleChange(value)}
          values={!isUpdate ? values : test}
          searchable
        />
      </form>
    </div>
  );
};

export default GroupData;
