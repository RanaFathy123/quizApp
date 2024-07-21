import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstanceWithHeaders } from "../../axiosConfig/axiosInstace";
import { Student, StudentsState } from "../../interfaces/interfaces";

const data: StudentsState = {
  students: [],
};

export const getAllStudents: any = createAsyncThunk(
  "students/getAll",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstanceWithHeaders.get<Student[]>(
        "/student"
      );
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkApi;
      console.log(rejectWithValue);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStudents.pending, (_state) => {
      // handle pending state if needed
    });
    builder.addCase(getAllStudents.fulfilled, (state, action) => {
      if (action.payload) {
        state.students = action.payload;
      }
    });
    builder.addCase(getAllStudents.rejected, (_state) => {
      // handle rejected state if needed
    });
  },
});

export const studentsData = studentsSlice.reducer;
