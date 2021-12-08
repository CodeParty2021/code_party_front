import { configureStore } from "@reduxjs/toolkit";
import userReducer from "services/user/user";
import { User } from "services/user/user";

export type RootState = {
  user: User | null;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
