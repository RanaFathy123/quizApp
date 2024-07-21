import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const loginData = {
  loginData: null,
};

const loginDataSlice = createSlice({
  name: "loginData",
  initialState: loginData,
  reducers: {
    saveLoginData: (state) => {
      let encodedData: any = localStorage.getItem("token");
      let decocodedData: any = jwtDecode(encodedData);
      state.loginData = decocodedData;
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.loginData = null;
    },
  },
});

export const { saveLoginData, logOut } = loginDataSlice.actions;
export const login = loginDataSlice.reducer;
