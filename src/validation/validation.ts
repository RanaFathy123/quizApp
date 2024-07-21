export const emailValidation = {
    required: "Email is required",
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Email is invalid",
    },
  };
  export const passwordValidation = {
    required: "Password is required",

  };
  export const userNameValidation = {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters",
    },
  
  };
  export const countryValidation = {
    required: "Country is required",
    minLength: {
      value: 3,
      message: "Country must be at least 3 characters",
    },
    maxLength: {
      value: 100,
      message: "Country must not be more than 50 characters",
    },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: "Country is invalid (only letters)",
    },
  };
  export const phoneNumberValidation = {
    required: "Phone Number is required",
    pattern: {
      value: /^01[0-2,5]{1}[0-9]{8}$/,
      message: "Invalid phone number format (01XXXXXXXXX)",
    },
  };
  export const OTPValidation = {
    required: "OTP is required",
  };