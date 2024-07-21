import { FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { emailValidation } from "../../../../validation/validation";
import useForgetPass from "../../../../hooks/useForgetPass";

const ForgetPass = () => {
  const { errors, handleSubmit, onSubmit, register } = useForgetPass();

  return (
    <div className="relative h-10  min-w-[200px] w-full mt-12">
      <h1 className="text-[#C5D86D] font-bold text-[25px]">Forgot password</h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full relative mt-12">
          <label htmlFor="email" className="text-white">
            Registered email address
          </label>
          <input
            type="text"
            id="email"
            className="py-3 px-12 w-full bg-transparent rounded-lg border-2 my-2 border-white focus:bg-transparent"
            placeholder="Type your email"
            {...register("email", emailValidation)}
          />
          <span className="absolute top-[2.8rem] left-0 flex items-center pl-5 pr-2">
            <MdEmail className="text-[1.5em] text-white" />
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
        <div className="flex-col mt-[5em] flex justify-center items-center md:justify-between md:flex-row gap-5 ">
          <button className="bg-white px-10 py-4 rounded-lg text-black font-bold flex gap-2 items-center">
            Send email
            <FaCheckCircle className="text-[1.5em] " />
          </button>
        </div>
        <div className="text-end mt-5 text-white">
          Login?{" "}
          <Link to="/login" className="text-[#C5D86D]">
            Click here?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgetPass;
