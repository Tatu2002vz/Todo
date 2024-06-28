import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
type Search = {
  search: string;
};

const initialState: Search = {
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = "";
    }
  },
});
export const { setSearch } = searchSlice.actions;
export const searchSelector = (state: RootState) => state.searchReducer;
export default searchSlice.reducer;
