import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstanceWithHeaders } from "../../axiosConfig/axiosInstace";

const data = {
  groups: [],
};

export const getAllGroups: any = createAsyncThunk(
  "groups/getAll",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstanceWithHeaders.get("/group");
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkApi;
      console.log(rejectWithValue);
    }
  }
);

const groupDataSlice = createSlice({
  name: "students",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGroups.pending, (_state) => {
      // handle pending state if needed
    });
    builder.addCase(getAllGroups.fulfilled, (state, action) => {
      if (action.payload) {
        state.groups = action.payload;
      }
    });
    builder.addCase(getAllGroups.rejected, (_state) => {
      // handle rejected state if needed
    });
  },
});

export const groupsData = groupDataSlice.reducer;
