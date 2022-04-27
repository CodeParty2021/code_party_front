import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//TODO:ホストURLを環境変数で設定したい
const API_HOST = "http://localhost:3001";

export type Step = {
  id: number;
  objective: string;
  description: string;
  index: number;
};

export type Steps = {
  stepList: { [id: number]: Step };
};

const stepSlice = createSlice({
  name: "steps",
  initialState: { stepList: {} } as Steps,
  reducers: {
    update: (state, action: { type: string; payload: Step[] }) => {
      action.payload.forEach((v) => {
        state.stepList[v.id] = v;
      });
    },
    clear: (state) => {
      state.stepList = {};
    },
  },
});

export const { update, clear } = stepSlice.actions;

export const stepUpdateAsync = () => {
  return async (dispatch: any) => {
    axios
      .get(API_HOST + "/stages/:id/steps/?format=json/")
      .then((res) => {
        const steps: Step[] = res.data;
        dispatch(update(steps));
      })
      .catch();
  };
};

export const oneStepUpdateAsync = (id: number) => {
  return async (dispatch: any) => {
    axios
      .get(API_HOST + "/stages/:id/steps/" + id + "/?format=json/")
      .then((res) => {
        const step: Step = res.data;
        dispatch(update([step]));
      })
      .catch();
  };
};


export default stepSlice.reducer;