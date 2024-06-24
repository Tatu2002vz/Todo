import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface status {
  status: number;
}
const initialState: status = {
  status: 0
};

export const statusFormSlice = createSlice({
  name: "statusForm",
  initialState,
  reducers: {
    closeForm: (state) => {
      state.status = 0;
    },
    showRegister: (state) => {
      state.status = 1;
    },
    showLogin: (state) => {
      state.status = 2;
    },
    showForgotPassword: (state) => {
      state.status = 3;
    },
    showResetPassword: (state) => {
      state.status = 4;
    }
  },
});
export const { showRegister, showLogin, showForgotPassword, closeForm } =
  statusFormSlice.actions;
export const statusFormSelector = (state: RootState) => state.statusFormReducer;
export default statusFormSlice.reducer;
