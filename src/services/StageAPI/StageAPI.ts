import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//TODO:ホストURLを環境変数で設定したい
const API_HOST = "http://localhost:8000";

export type Stage = {
  id: number;
  name: string;
  stage_index: number;
  rule: string;
};

export type Stages = {
  stageList: { [id: number]: Stage };
};

const stageSlice = createSlice({
  name: "stages",
  initialState: { stageList: {} } as Stages,
  reducers: {
    update: (state, action: { type: string; payload: Stage[] }) => {
      action.payload.forEach((v) => {
        state.stageList[v.id] = v;
      });
    },
    clear: (state) => {
      state.stageList = {};
    },
  },
});

export const { update, clear } = stageSlice.actions;

export const stageUpdateAsync = () => {
  return async (dispatch: any) => {
    axios
      .get(API_HOST + "/stages/?format=json")
      .then((res) => {
        const stages: Stage[] = res.data;
        dispatch(update(stages));
      })
      .catch();
  };
};

export const oneStageUpdateAsync = (id: number) => {
  return async (dispatch: any) => {
    axios
      .get(API_HOST + "/stages/" + id + "?format=json")
      .then((res) => {
        const stage: Stage = res.data;
        dispatch(update([stage]));
      })
      .catch();
  };
};

export default stageSlice.reducer;
