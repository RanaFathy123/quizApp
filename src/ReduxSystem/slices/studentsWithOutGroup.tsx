import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstanceWithHeaders } from "../../axiosConfig/axiosInstace";

const data = {
  studentWithoutGroup: [],
};

export const getStudentsWithOutGroup: any = createAsyncThunk(
  "getStudentsWithoutGroups",
  async (_id, thunkApi) => {
    try {
      const response = await axiosInstanceWithHeaders.get(
        "/student/without-group"
      );

      return response.data;
    } catch (err) {
      const { rejectWithValue } = thunkApi;
      console.log(rejectWithValue);
    }
  }
);
const studentWithOutGroupSlice = createSlice({
  name: "student/withoutGroup",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentsWithOutGroup.pending, (_state) => {
      // handle pending state if needed
    });
    builder.addCase(getStudentsWithOutGroup.fulfilled, (state, action) => {
      if (action.payload) {
        state.studentWithoutGroup = action.payload;
      }
    });
    builder.addCase(getStudentsWithOutGroup.rejected, (_state) => {
      // handle rejected state if needed
    });
  },
});
export const studentsWithOutGroupData = studentWithOutGroupSlice.reducer;
