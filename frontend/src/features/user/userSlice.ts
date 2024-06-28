import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getCurrent } from "./asyncAction";
export interface User {
  name: string;
  email: string;
  token: string;
  message: string;
}
const initialState: User = {
  name: "",
  email: "",
  token: "",
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
    },
    clearMsg: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrent.rejected, (state, action: any) => {
      if (action.payload.status === 401)
        state.message = "Phiên đăng nhập đã hết hạn! Đăng nhập lại.";
    });
  },
});
export const { login, logout, clearMsg } = userSlice.actions;
export const userSelector = (state: RootState) => state.persistedReducer;
export default userSlice.reducer;
