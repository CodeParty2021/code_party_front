import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  idToken: string;
  displayName: string;
  email: string;
  photoUrl?: string;
};

export type UserState = {
  user: User | null;
};

// createSlice() で actions と reducers を一気に生成
const userSlice = createSlice({
  name: "users", //識別用の名前
  initialState: { user: null } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      console.log(state);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
