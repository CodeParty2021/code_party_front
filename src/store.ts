import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "services/auth/auth";

export type RootState = {
  counter: { count: number };
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
