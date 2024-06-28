import { apiGetCurrent } from "./../../apis/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrent = createAsyncThunk(
  "user/getCurrent",
  async (payload, { rejectWithValue }) => {
    const data = await apiGetCurrent();
    if (data.status === 200) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  }
);
