import { createSlice } from "@reduxjs/toolkit";

// createSlice() で actions と reducers を一気に生成
const counterSlice = createSlice({
  name: "counter", //識別用の名前
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
