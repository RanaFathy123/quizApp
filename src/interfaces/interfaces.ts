export interface TabData {
    label: string;
    value: string;
    component: React.ReactNode;
  }

// Login & Forget Password&Reset  Password
export interface FormData {
  email: string;
  password: string;
  message?: string;
  confirmPassword?: string;
  seed?: string;
}
export interface FormDataVerify {
  email: string;
  code: string;
}
export interface FormDataRegister {
  first_name: string;
  last_name: string;
  email: string;
  password:string;
  role: string;
}
export interface FormDataForgetPass {
  email:string
}
export interface FormDataResetPass{
  email:string;
  otp:string;
  password:string;
  confirmPassword :string;
}
export interface ChangPass {
  handleClose: () => void;
}

export interface FormDataChangPass {
  password: string;
  password_new: string|undefined;

}

export interface AuthContextType {
  baseUrl?: string;
  loginData:  null;
  saveLoginData: () => void;
  resetLoginData:()=>void  
}

export interface Student {
  id: number;
  first_name: string;
  last_name:string;
  email:string;
  status:string;
  role:string;
  group:{}

}
export interface StudentsState {
  students: Student[] | undefined;
}
