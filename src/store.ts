import { configureStore } from "@reduxjs/toolkit";
import authReducer from "services/auth/auth";

export type RootState = {
  auth: { user: any };
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
