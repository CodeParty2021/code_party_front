import { createSlice } from "@reduxjs/toolkit";

// createSlice() で actions と reducers を一気に生成
const authSlice = createSlice({
  name: "users", //識別用の名前
  initialState: { user: undefined },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
