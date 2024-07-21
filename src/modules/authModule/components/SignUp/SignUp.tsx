import { FaCheckCircle, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";
import useRegister from "../../../../hooks/useRegister";
import {
  emailValidation,
  passwordValidation,
  userNameValidation,
} from "../../../../validation/validation";

const SignUp = () => {
  const { errors, handleSubmit, onSubmit, register } = useRegister();
  return (
    <div className="text-white my-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10 md:flex-row flex-col">
          <div className="w-full relative">
            <label htmlFor="firstName">Your first name</label>
            <input
              type="text"
              id="firstName"
              className="py-3 px-12 w-full bg-transparent rounded-lg border-2 my-2 border-white focus:bg-transparent"
              placeholder="Type your first name"
              {...register("first_name", userNameValidation)}
            />
            <span className="absolute top-[2.8rem] left-0 flex items-center pl-5 pr-2">
              <FaClipboardUser className="text-[1.5em]" />
            </span>
          </div>
          <div className="w-full relative">
            <label htmlFor="lastName">Your last name</label>
            <input
              type="text"
              id="lastName"
              className="py-3 px-12 w-full bg-transparent rounded-lg border-2 my-2 border-white focus:bg-transparent"
              placeholder="Type your last name"
              {...register("last_name", userNameValidation)}
            />
            <span className="absolute top-[2.8rem] left-0 flex items-center pl-5 pr-2">
              <FaClipboardUser className="text-[1.5em]" />
            </span>
          </div>
        </div>

        {errors.last_name && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {errors.last_name.message}
          </div>
        )}
        <div className="w-full relative mt-5">
          <label htmlFor="email">Your email address</label>
          <input
            type="text"
            id="email"
            className="py-3 px-12 w-full bg-transparent rounded-lg border-2 my-2 border-white focus:bg-transparent"
            placeholder="Type your email"
            {...register("email", emailValidation)}
          />
          <span className="absolute top-[2.8rem] left-0 flex items-center pl-5 pr-2">
            <MdEmail className="text-[1.5em]" />
          </span>
        </div>
        {errors.email && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {errors.email.message}
          </div>
        )}
        <div className="w-full relative mt-1">
          <label htmlFor="role">role</label>
          <select
            className="py-3 px-12 w-full bg-transparent rounded-lg border-2 my-2 border-white focus:bg-transparent"
            {...register("role")}
          >
            <option className="text-black" value={"Instructor"}>
              Instructor
            </option>
            <option className="text-black" value={"Student"}>
              Student
            </option>
          </select>

          <span className="absolute top-[2.8rem] left-0 flex items-center pl-5 pr-2">
            <MdEmail className="text-[1.5em]" />
          </span>
        </div>
        <div className="w-full mt-2 mb-1 relative">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="py-3 px-12 w-full bg-transparent rounded-lg border-2  my-1 border-white"
            placeholder="Type your password"
            {...register("password", passwordValidation)}
          />
          <span className="absolute top-[2.8rem] left-0  flex items-center pl-5">
            <FaKey className="text-[1.5em]" />
          </span>
        </div>
        {errors.password && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3"
            role="alert"
          >
            {errors.password.message}
          </div>
        )}
        <div className="flex-col flex justify-center items-center md:justify-between md:flex-row gap-5 mt-7">
          <button className="bg-white px-10 py-4 rounded-lg text-black font-bold flex gap-2 items-center">
            Sign Up
            <FaCheckCircle className="text-[1.5em]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
