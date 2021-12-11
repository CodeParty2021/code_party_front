import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "services/user/user";
import { UserState } from "services/user/user";

export type RootState = {
  user: UserState;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [thunk],
});
