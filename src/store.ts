import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "services/user/user";
import { UserState } from "services/user/user";

import stageReducer from "./services/StageAPI/StageAPI";
import { Stages } from "./services/StageAPI/StageAPI";
export type RootState = {
  user: UserState;
  stages: Stages;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    stages: stageReducer,
  },
  middleware: [thunk],
});
