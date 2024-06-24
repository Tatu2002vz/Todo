import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Todo } from "pages/Home";
interface todoList {
    todoList: Todo[]
}
const initialState:todoList = {
    todoList: []
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    pushAllTodo: (state, action) => {
        state.todoList = action.payload
    },
    clearTodo: (state) => {
        state.todoList = []
    }
  },
});
export const { pushAllTodo, clearTodo } = todoSlice.actions;
export const todoSelector = (state: RootState) => state.todoReducer;
export default todoSlice.reducer;
