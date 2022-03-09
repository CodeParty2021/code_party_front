import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useSearchRoomState } from "./useSearchRoomState";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/RoomSyncHooks/useRoomSync");

const useRoomSyncMock = useRoomSync as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;

const initialRoomState = {
  isEntered: false,
  sortedKeysOfMembers: [],
  members: {},
  sortedKeysOfActions: [],
  actions: {},
};

const initialRoomSyncState = {
  room: {...initialRoomState},
  enterRoom: jest.fn(),
};

const navigateMock = {do: jest.fn()};

describe("useWaitingRoomState", () => {
  beforeEach(() => {
    useRoomSyncMock.mockReturnValue({...initialRoomSyncState});
    useNavigateMock.mockReturnValue(navigateMock.do);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const {result} = renderHook(() => useSearchRoomState());
    expect(result.current.roomIdTextBoxValue).toBe("");
  });

  it("room.isEntered=trueでページ遷移", () => {
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        isEntered: true,
      },
    });
    const spyNavigate = jest.spyOn(navigateMock, "do");
    renderHook(() => useSearchRoomState());
    expect(spyNavigate).lastCalledWith("/casual-battle/waiting-room");
  });

  it("exec roomIdTextBoxChangeHandler", () => {
    const {result} = renderHook(() => useSearchRoomState());
    const {roomIdTextBoxChangeHandler} = result.current;
    act(()=>{
      roomIdTextBoxChangeHandler("typed value");
    });
    expect(result.current.roomIdTextBoxValue).toBe("typed value");
  });

  it("exec enterBtnClickHandler", () => {
    const spyEnterRoom = jest.spyOn(initialRoomSyncState, "enterRoom");
    const {result} = renderHook(() => useSearchRoomState());
    const {roomIdTextBoxChangeHandler} = result.current;

    act(()=>{
      roomIdTextBoxChangeHandler("roomid");
    });

    const {enterBtnClickHandler} = result.current;
    act(()=>{
      enterBtnClickHandler();
    });

    expect(spyEnterRoom).lastCalledWith("roomid");
  });
});
