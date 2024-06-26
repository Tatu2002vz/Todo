import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiSearchTodo } from "apis/todo";

export const getTodoAsync = createAsyncThunk(
  "todo/getTodoAsync",
  async (payload: any) => {
    const data = await apiSearchTodo({search: payload.search});
    if(data.status === 200) {
      return data;
    }
  }
);
