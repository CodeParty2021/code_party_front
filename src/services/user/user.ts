import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  idToken: string;
  displayName: string;
  email: string;
  photoUrl?: string;
};

export type UserState = {
  user: User | null;
  isLogin: boolean;
};

// createSlice() で actions と reducers を一気に生成
const userSlice = createSlice({
  name: "users", //識別用の名前
  initialState: { user: null, isLogin: false } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    signOut: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export const { setUser, signOut } = userSlice.actions;

export default userSlice.reducer;
