import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  idToken: string;
  displayName: string;
  email: string;
  photoUrl?: string;
};

// createSlice() で actions と reducers を一気に生成
const userSlice = createSlice({
  name: "users", //識別用の名前
  initialState: null as User | null,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
      console.log(state);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
