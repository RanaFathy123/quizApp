import { FaCheckCircle, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  OTPValidation,
  emailValidation,
  passwordValidation,
} from "../../../../validation/validation";
import useResetPass from "../../../../hooks/useResetPass";

const ResetPass = () => {
  const { errors, handleSubmit, onSubmit, register } = useResetPass();

  return (
    <div className="text-white my-10  ">
      <h1 className="text-[#C5D86D] font-bold text-[25px] my-12">
        Reset password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="w-full relative mt-5">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            className="py-3 px-12 w-full bg-transparent rounded-lg border-2 my-2 border-white focus:bg-transparent"
            placeholder="Type your otp"
            {...register("otp", OTPValidation)}
          />
          <span className="absolute top-[2.8rem] left-0 flex items-center pl-5 pr-2">
            <MdEmail className="text-[1.5em]" />
          </span>
        </div>
        {errors.otp && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {errors.otp.message}
          </div>
        )}
        <div className="w-full mt-5 mb-1 relative ">
          <label htmlFor="password" className="mt-3">
            Password
          </label>
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
            Reset
            <FaCheckCircle className="text-[1.5em]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
