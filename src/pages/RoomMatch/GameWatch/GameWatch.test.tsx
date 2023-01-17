import React from "react";
import { shallow } from "enzyme";

import { RoomMatchGameWatch } from "./GameWatch";
import { IResponse, useGameWatchState } from "./hooks/useGameWatchState";
import { UnityContext } from "react-unity-webgl";

jest.mock("./hooks/useGameWatchState");
jest.mock("./hooks/useRunSimulation");

const useGameWatchStateMock = useGameWatchState as jest.Mock;

const state: IResponse = {
  messageType: "Analyzing",
  state: "Analyzing",
  unityContext: new UnityContext({
    codeUrl: "",
    dataUrl: "",
    frameworkUrl: "",
    loaderUrl: "",
  }),
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
});
