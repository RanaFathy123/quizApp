import { configureStore } from "@reduxjs/toolkit";
import { login } from "./slices/loginDataSlice";
import { studentsData } from "./slices/studentsSlice";
import { groupsData } from "./slices/groupDataSlice";
import { studentsWithOutGroupData } from "./slices/studentsWithOutGroup";

const store: any = configureStore({
  reducer: { login, studentsData, groupsData, studentsWithOutGroupData },
});
export default store;
