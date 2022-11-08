import React from "react";
import { shallow } from "enzyme";

import { RoomMatchGameWatch } from "./GameWatch";
import { IResponse, useGameWatchState } from "./hooks/useGameWatchState";

jest.mock("./hooks/useGameWatchState");
jest.mock("./hooks/useRunSimulation");

const useGameWatchStateMock = useGameWatchState as jest.Mock;

const state: IResponse = {
  isAnalyzing: false,
  analyzingError: false,
  result: {
    id: "resultId",
    jsonPath: "/tmp/resultId",
    step: 15,
    codes: ["codeid1", "codeid2", "codeid3"],
  },
  exitBtnHandler: jest.fn(),
};

describe("<RoomMatchGameWatch />", () => {
  beforeEach(() => {
    useGameWatchStateMock.mockReturnValue({
      ...state,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("snapshot test", () => {
    const wrapper = shallow(<RoomMatchGameWatch />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("exit button test", () => {
    const wrapper = shallow(<RoomMatchGameWatch />);

    const btn = wrapper.find("#exit-btn");
    btn.simulate("click");

    expect(state.exitBtnHandler).toHaveBeenCalled();
  });
});
