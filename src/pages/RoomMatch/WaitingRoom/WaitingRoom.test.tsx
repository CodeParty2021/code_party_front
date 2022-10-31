import React from "react";
import { shallow } from "enzyme";

import { RoomMatchWaitingRoom } from "./WaitingRoom";
import { IResponse, useWaitingRoomState } from "./hooks/useWaitingRoomState";

jest.mock("./hooks/useWaitingRoomState");

const useSelectorMock = useWaitingRoomState as jest.Mock;

const state: IResponse = {
  user: {
    id: "user-id-2",
    displayName: "user 2",
    email: "email",
    picture: "picture",
    jwt: "fewaf",
    isAnonymous: false,
  },
  roomInfo: {
    roomId: "room id",
    invitationLink:
      "http://localhost:3000/#/room-match/invitation/-MzESfkdu9Xmu8pkOAw5",
    host: {
      displayName: "host user",
      ready: false,
      status: "waiting",
      codeId: "hostCodeId",
    },
    memberKeys: ["host-user-id", "user-id-1", "user-id-2"],
    members: {
      "host-user-id": {
        displayName: "host user",
        ready: false,
        status: "waiting",
        codeId: "hostCodeId1",
      },
      "user-id-1": {
        displayName: "user 1",
        ready: true,
        status: "watching",
        codeId: "codeId1",
      },
      "user-id-2": {
        displayName: "user 2",
        ready: true,
        status: "disconnect",
        codeId: "codeId2",
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
        userId: "user-id-2",
      },
    },
  },
  isHost: true,
  status: "waiting",
  ready: true,
  readyBtnHandler: jest.fn(),
  readyBtnDisabled: false,
  exitBtnHandler: jest.fn(),
  startBtnDisabled: false,
  startBtnHandler: jest.fn(),
  isCopyBtnClicked: false,
  invitationBtnHandler: jest.fn(),
  kickUserHandler: jest.fn(),
  code: {
    codes: [
      {
        id: "hostCodeId1",
        codeContent: "print('hello world)'",
        createdAt: "2022-02-16T05:05:46.315585+09:00",
        updatedAt: "2022-02-16T06:33:00.058575+09:00",
        language: "1",
        step: "3",
        user: "host user id",
      },
      {
        id: "hostCodeId2",
        codeContent: "alert('hello world)'",
        createdAt: "2022-02-16T10:00:46.315585+09:00",
        updatedAt: "2022-02-16T11:10:00.058575+09:00",
        language: "1",
        step: "3",
        user: "host user id",
      },
    ],
    loading: false,
  },
  selectedCodeId: "codeId1",
  onChangeSelectedCodeId: jest.fn(),
};

describe("<RoomMatchWaitingRoom />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...state,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("snapshot test", () => {
    const wrapper = shallow(<RoomMatchWaitingRoom />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("start button test", () => {
    const wrapper = shallow(<RoomMatchWaitingRoom />);

    const btn = wrapper.find("#start-btn");
    btn.simulate("click");

    expect(state.startBtnHandler).toHaveBeenCalled();
  });

  it("kick user button test", () => {
    const wrapper = shallow(<RoomMatchWaitingRoom />);

    const btn = wrapper.find("#kick-btn-user-id-1");
    btn.simulate("click");

    expect(state.kickUserHandler).toHaveBeenCalled();
  });

  it("exit button test", () => {
    const wrapper = shallow(<RoomMatchWaitingRoom />);

    const btn = wrapper.find("#exit-btn");
    btn.simulate("click");

    expect(state.exitBtnHandler).toHaveBeenCalled();
  });

  it("ready button test", () => {
    const wrapper = shallow(<RoomMatchWaitingRoom />);

    const btn = wrapper.find("#ready-btn");
    btn.simulate("click");

    expect(state.readyBtnHandler).toHaveBeenCalled();
  });

  it("inputが変化した時にonChangeSelectedCodeIdが呼ばれるか", () => {
    const wrapper = shallow(<RoomMatchWaitingRoom />);

    wrapper.find("input[value='hostCodeId1']").simulate("change", {
      target: {
        value: "selectedCodeId",
      },
    });
    expect(state.onChangeSelectedCodeId).toBeCalledTimes(1);
    expect(state.onChangeSelectedCodeId).lastCalledWith("selectedCodeId");
  });

  it("copy button test", () => {
    const wrapper = shallow(<RoomMatchWaitingRoom />);

    const btn = wrapper.find("#invitation-btn");
    btn.simulate("click");

    expect(state.invitationBtnHandler).toHaveBeenCalled();
  });
});
