import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
interface Theme {
  theme: boolean;
}
const initialState: Theme = {
  theme: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // dark: (state, action: PayloadAction<Theme>) => {
    //   state.theme = true;
    // },
    // light: (state, action: PayloadAction<Theme>) => {
    //   state.theme = false;
    // },
    toggleTheme: (state) => {
        state.theme = !state.theme;
    }
  },
});
export const { toggleTheme } = themeSlice.actions;
export const themeSelector = (state: RootState) => state.themePersist;
export default themeSlice.reducer;
