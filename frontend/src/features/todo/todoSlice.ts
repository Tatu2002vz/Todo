import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Todo } from "pages/UpdateTask";
import { getTodoAsync } from "./asyncAction";
interface todoList {
  todo: Todo[];
  todoExpired: Todo[];
  todoImportant: Todo[];
  todoCompleted: Todo[];
}
const initialState: todoList = {
  todo: [],
  todoExpired: [],
  todoImportant: [],
  todoCompleted: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    pushAllTodo: (state, action: PayloadAction<todoList>) => {
      state.todo = action.payload.todo;
      state.todoExpired = action.payload.todoExpired;
      state.todoImportant = action.payload.todoImportant;
      state.todoCompleted = action.payload.todoCompleted;
    },
    clearTodo: (state) => {
      state.todo = [];
      state.todoExpired = [];
      state.todoImportant = [];
      state.todoCompleted = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodoAsync.pending, () => {})
      .addCase(getTodoAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const data = action.payload?.data?.mes?.map((item: any) => {
            const { content, description, expired, status, _id, important } =
              item;
            console.log({
              content,
              description,
              expired,
              status,
              id: _id,
              important,
            });
            return {
              content,
              description,
              expired,
              status,
              id: _id,
              important,
            };
          });

          const todoExpired = data?.filter((el: Todo) => {
            const dateNow = new Date().getTime();
            return (
              new Date(el?.expired || "").getTime() < dateNow &&
              el.status === "incomplete"
            );
          });
          const todo = data?.filter((el: Todo) => {
            const dateNow = new Date().getTime();
            return (
              new Date(el?.expired || "").getTime() > dateNow &&
              el.status === "incomplete"
            );
          });
          const todoCompleted = data?.filter((el: Todo) => {
            return el.status === "completed";
          });
          const todoImportant = data?.filter((el: Todo) => {
            return el.important === true;
          });
          state.todo = todo;
          state.todoExpired = todoExpired;
          state.todoImportant = todoImportant;
          state.todoCompleted = todoCompleted;
        }
      });
  },
});
export const { pushAllTodo, clearTodo } = todoSlice.actions;
export const todoSelector = (state: RootState) => state.todoReducer;
export default todoSlice.reducer;
