import React from "react";
import { act, renderHook, RenderResult } from "@testing-library/react-hooks";
import { useSelector, useDispatch } from "react-redux";

import { useRoomSync } from "./useRoomSync";
import {
  startRoomDBSync,
  startMembersDBSync,
  startActionsDBSync,
  stopRoomDBSync,
  stopMembersDBSync,
  stopActionsDBSync,
  UserState,
  UserAction,
} from "services/RoomSync/RoomSync";

jest.mock("react-redux");
jest.mock("services/RoomSync/RoomSync");

const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const startRoomDBSyncMock = startRoomDBSync as jest.Mock;
const startMembersDBSyncMock = startMembersDBSync as jest.Mock;
const startActionsDBSyncMock = startActionsDBSync as jest.Mock;
const stopRoomDBSyncMock = stopRoomDBSync as jest.Mock;
const stopMembersDBSyncMock = stopMembersDBSync as jest.Mock;
const stopActionsDBSyncMock = stopActionsDBSync as jest.Mock;

const RoomSyncActions = {
  startRoomDBSync: jest.fn(),
  startMembersDBSync: jest.fn(),
  startActionsDBSync: jest.fn(),
  stopRoomDBSync: jest.fn(),
  stopMembersDBSync: jest.fn(),
  stopActionsDBSync: jest.fn(),
};

const dispatchMock = {"do": jest.fn()};

const users: {[id: string]: UserState} = {
  "userid1" : {
    displayName: "user1",
    ready: true,
  },
  "userid2" : {
    displayName: "user2",
    ready: false,
  },
  "userid3" : {
    displayName: "user3",
    ready: true,
  },
};

const actions: {[id: string]: UserAction} = {
  "actionid1": {
    actionId: 1,
    userId: "userid1",
  },
  "actionid2": {
    actionId: 2,
    userId: "userid2",
  },
  "actionid3": {
    actionId: 3,
    userId: "userid3",
  },
};

const initialRoomState = {
  id: "room id",
  isEntered: true,
  info: {
    host: "userid1",
  },
  sortedKeysOfMembers: ["userid1"],
  members: {"userid1": users["userid1"]},
  sortedKeysOfActions: ["actionid1"],
  actions: {"actionid1": actions["actionid1"]},
};

const userState = {
  user: {
    id: "userid1",
    displayName: "user1",
  },
};

describe("useRoomSync", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...initialRoomState,
      ...userState,
    });
    useDispatchMock(() => dispatchMock.do);
    startRoomDBSyncMock(RoomSyncActions.startRoomDBSync);
    startMembersDBSyncMock(RoomSyncActions.startMembersDBSync);
    startActionsDBSyncMock(RoomSyncActions.startActionsDBSync);
    stopRoomDBSyncMock(RoomSyncActions.stopRoomDBSync);
    stopMembersDBSyncMock(RoomSyncActions.stopMembersDBSync);
    stopActionsDBSyncMock(RoomSyncActions.stopActionsDBSync);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const {result} = renderHook(() => useRoomSync());
    //テストではroom情報の他にuserStateが混じっている
    expect(result.current.room).toMatchObject({...initialRoomState});
    expect(result.current.isHost).toBe(true);
  });

  it.todo("exec createRoom");
  it.todo("exec enterRoom");
  it.todo("exec exitRoom");
  it.todo("exec updateMember");
  it.todo("exec addAction");
  it.todo("exec updateAction");
  it.todo("exec removeAction");

  describe("DB更新が行われない状態をテスト", () => {
    let result: RenderResult<any>;
    beforeEach(()=>{
      useSelectorMock.mockReturnValue({
        ...initialRoomState,
        id: undefined,
      });
      result = renderHook(() => useRoomSync()).result;
    });
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("createRoom", () => {
      const spy = jest.spyOn(dispatchMock, "do");
      const {createRoom} = result.current;
      act(() => {
        createRoom();
      });
      expect(spy).not.toHaveBeenCalled();
    });
    it("enterRoom", () => {
      const spy = jest.spyOn(dispatchMock, "do");
      const {enterRoom} = result.current;
      act(() => {
        enterRoom();
      });
      expect(spy).not.toHaveBeenCalled();
    });
    it("exitRoom", () => {
      const spy = jest.spyOn(dispatchMock, "do");
      const {exitRoom} = result.current;
      act(() => {
        exitRoom();
      });
      expect(spy).not.toHaveBeenCalled();
    });
    it.todo("updateMember");
    it.todo("addAction");
    it.todo("updateAction");
    it.todo("removeAction");
  });
});
