import React from "react";
import { shallow } from "enzyme";

import { CasualBattleWaitingRoom } from "./WaitingRoom";
import { IResponse, useWaitingRoomState } from "./hooks/useWaitingRoomState";

jest.mock("./hooks/useWaitingRoomState");

const useSelectorMock = useWaitingRoomState as jest.Mock;

const state: IResponse = {
  roomInfo: {
    roomId: "room id",
    host: {
      displayName: "host user",
      ready: false,
    },
    memberKeys: ["host user id", "user id 1", "user id 2"],
    members: {
      "host user id": {
        displayName: "host user",
        ready: false,
      },
      "user id 1": {
        displayName: "user 1",
        ready: true,
      },
      "user id 2": {
        displayName: "user 2",
        ready: true,
      },
    },
    actionKeys: ["action id 1", "action id 2", "action id 3"],
    actions: {
      "action id 1": {
        actionId: 1,
        userId: "host user id",
      },
      "action id 2": {
        actionId: 2,
        userId: "user id 1",
      },
      "action id 3": {
        actionId: 3,
        userId: "user id 2",
      },
    },
  },
  isHost: true,
  readyBtnHandler: jest.fn(),
  exitBtnHandler: jest.fn(),
  startBtnDisabled: false,
  startBtnHandler: jest.fn(),
};

describe("<CasualBattleWaitingRoom />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...state,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("snapshot test", () => {
    const wrapper = shallow(<CasualBattleWaitingRoom />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("start button test", () => {
    const wrapper = shallow(<CasualBattleWaitingRoom />);
    const spy = jest.spyOn(state, "startBtnHandler");

    const btn = wrapper.find("#start-btn");
    btn.simulate("click");

    expect(spy).toHaveBeenCalled();
  });

  it("exit button test", () => {
    const wrapper = shallow(<CasualBattleWaitingRoom />);
    const spy = jest.spyOn(state, "exitBtnHandler");

    const btn = wrapper.find("#exit-btn");
    btn.simulate("click");

    expect(spy).toHaveBeenCalled();
  });

  it("ready button test", () => {
    const wrapper = shallow(<CasualBattleWaitingRoom />);
    const spy = jest.spyOn(state, "readyBtnHandler");

    const btn = wrapper.find("#ready-btn");
    btn.simulate("click");

    expect(spy).toHaveBeenCalled();
  });
});
