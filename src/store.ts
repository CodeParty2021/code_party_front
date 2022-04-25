import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "services/user/user";
import stageReducer from "services/StageAPI/StageAPI";
import stepReducer from "services/StageAPI/StageAPI";
import roomReducer from "services/RoomSync/RoomSync";
import { LoginUserState } from "services/user/user";
import { Stages } from "services/StageAPI/StageAPI";
import { Steps } from "services/StepAPI/StepAPI";
import { RoomState } from "services/RoomSync/RoomSync";

export type RootState = {
  user: LoginUserState;
  stages: Stages;
  steps: Steps;
  room: RoomState;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    stages: stageReducer,
    steps: stepReducer,
    room: roomReducer,
  },
  middleware: [thunk],
});
