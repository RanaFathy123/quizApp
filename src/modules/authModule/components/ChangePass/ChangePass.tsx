import { FaCheckCircle, FaKey } from "react-icons/fa";
import useChangePass from "../../../../hooks/useChangePass";
import { passwordValidation } from "../../../../validation/validation";

const ChangePass = () => {
  const { errors, handleSubmit, onSubmit, register, watch } = useChangePass();
  return (
    <div className="text-white my-10  ">
      <h1 className="text-[#C5D86D] font-bold text-[25px] my-12">
        Change password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full  relative ">
          <label htmlFor="password" className="mt-3">
            Old Password
          </label>
          <input
            type="password"
            id="password"
            className="py-3 px-12 w-full bg-transparent rounded-lg border-2  my-1  border-white"
            placeholder="Type your password"
            {...register("password", passwordValidation)}
          />
          <span className="absolute top-[2.8rem] left-0  flex items-center pl-5">
            <FaKey className="text-[1.5em]" />
          </span>
        </div>
        {errors.password && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-12 rounded relative"
            role="alert"
          >
            {errors.password.message}
          </div>
        )}
        <div className="w-full mt-14 mb-1 relative ">
          <label htmlFor="newpassword" className="mt-12">
            New Password
          </label>
          <input
            type="password"
            id="newpassword"
            className="py-3 px-12 w-full bg-transparent rounded-lg border-2  my-1 border-white"
            placeholder="Type your New Password"
            {...register("password_new", {
              required: "New Password is required ",
              validate: (value: any) =>
                value === watch("password") || "the passwords dont match ",
            })}
          />
          <span className="absolute top-[2.8rem] left-0  flex items-center pl-5">
            <FaKey className="text-[1.5em]" />
          </span>
        </div>
        {errors.password_new && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3"
            role="alert"
          >
            {errors.password_new.message}
          </div>
        )}
        <div className="flex-col flex justify-center items-center md:justify-between md:flex-row gap-5 mt-12">
          <button className="bg-white px-10 py-4 rounded-lg text-black font-bold flex gap-2 items-center">
            Change
            <FaCheckCircle className="text-[1.5em]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePass;
