import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import stageReducer from "./services/StageAPI/StageAPI";
import { Stages } from "./services/StageAPI/StageAPI";

export type RootState = {
  stages: Stages;
};

export const store = configureStore({
  reducer: {
    stages: stageReducer,
  },
  middleware: [thunk],
});
