import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  isLoadingAdmin: true,
  currentPage: "/",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toogleIsCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    changeIsLoadingAdmin: (state) => {
      state.isLoadingAdmin = !state.isLoadingAdmin;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toogleIsCollapsed, changeIsLoadingAdmin, setCurrentPage } =
  appSlice.actions;

export default appSlice.reducer;
