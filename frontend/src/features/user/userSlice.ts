import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
export interface User {
  name: string;
  email: string;
  token: string;
}
const initialState: User = {
  name: "",
  email: "",
  token: "",
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
  },
});
export const { login, logout } = userSlice.actions;
export const userSelector = (state: RootState) => state.persistedReducer;
export default userSlice.reducer;
