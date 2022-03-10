import React from "react";
import { act, renderHook, RenderResult } from "@testing-library/react-hooks";

import { useDispatch, useSelector } from "react-redux";
import { child, get, push, set, update } from "firebase/database";
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

import { useRoomSync } from "./useRoomSync";

jest.mock("react-redux");
jest.mock("services/RoomSync/RoomSync");
jest.mock("firebase/database");

const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const startRoomDBSyncMock = startRoomDBSync as jest.Mock;
const startMembersDBSyncMock = startMembersDBSync as jest.Mock;
const startActionsDBSyncMock = startActionsDBSync as jest.Mock;
const stopRoomDBSyncMock = stopRoomDBSync as jest.Mock;
const stopMembersDBSyncMock = stopMembersDBSync as jest.Mock;
const stopActionsDBSyncMock = stopActionsDBSync as jest.Mock;
const childMock = child as jest.Mock;
const getMock = get as jest.Mock;
const pushMock = push as jest.Mock;
const setMock = set as jest.Mock;
const updateMock = update as jest.Mock;

const RoomSyncActions = {
  startRoomDBSync: jest.fn(),
  startMembersDBSync: jest.fn(),
  startActionsDBSync: jest.fn(),
  stopRoomDBSync: jest.fn(),
  stopMembersDBSync: jest.fn(),
  stopActionsDBSync: jest.fn(),
};

// const firebaseDBFuncs = {
//   child: jest.fn((ref: any, path: any) => ref.toString() + "/" + path.toString()),
//   get: jest.fn((ref: any) => {}),
//   push: jest.fn(async (ref: any, data: object) => {
//     return {...data, key:"pushedKey"};
//   }),
//   set: jest.fn(),
//   update: jest.fn(),
// };

const dispatchMock = jest.fn();
// dispatchMock.do.mockImplementation(async (func: any) => {
//   await func(dispatchMock.do, {});
//   console.log(func);
// });

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
  id: "roomid",
  isEntered: true,
  info: {
    name: "room's name",
    host: "userid1",
    state: "waiting",
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
    email: "test@test.com",
    picture: "user pic",
    jwt: "user jwt",
  },
};

describe("useRoomSync", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      ...initialRoomState,
      ...userState,
    });
    dispatchMock.mockImplementation((func: any) => Promise.resolve((async (func: any) => {
      return await func();
    })(func)));
    useDispatchMock.mockReturnValue(dispatchMock);
    //RoomSync
    startRoomDBSyncMock.mockReturnValue(RoomSyncActions.startRoomDBSync);
    startMembersDBSyncMock.mockReturnValue(RoomSyncActions.startMembersDBSync);
    startActionsDBSyncMock.mockReturnValue(RoomSyncActions.startActionsDBSync);
    stopRoomDBSyncMock.mockReturnValue(RoomSyncActions.stopRoomDBSync);
    stopMembersDBSyncMock.mockReturnValue(RoomSyncActions.stopMembersDBSync);
    stopActionsDBSyncMock.mockReturnValue(RoomSyncActions.stopActionsDBSync);
    //firebase DB
    childMock.mockImplementation(
      (ref: any, path: any) => ref.toString() + "/" + path.toString()
    );
    getMock.mockImplementation(
      async (ref: any) => {
        return {key: "getkey", data: {}};
      }
    );
    pushMock.mockImplementation(
      async (ref: any, data: object) => {
        return {...data, key:"pushedKey"};
      }
    );
    setMock.mockImplementation(async () => {});
    updateMock.mockImplementation(async () => {});
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

  it("exec createRoom", async () => {
    //const spyDispatch = jest.spyOn(dispatchMock, "do");
    //const spySet = jest.spyOn(firebaseDBFuncs, "set");
    const {result} = renderHook(() => useRoomSync());
    const {createRoom} = result.current;
    act(() => {
      createRoom();
    });
    const data = await dispatchMock(() => {return {data: "a"}});
    console.log(data);
    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock).toBeCalledTimes(10);
    expect(pushMock).lastCalledWith(["RoomApp/rooms", {
      name: "blank",
      host: "userid1",
      state: "waiting",
    }]);
    expect(setMock).lastCalledWith("RoomApp/rooms/roomid");
    expect(RoomSyncActions.startRoomDBSync).lastCalledWith("pushedKey");
    expect(RoomSyncActions.startMembersDBSync).lastCalledWith("pushedKey");
    expect(RoomSyncActions.startActionsDBSync).lastCalledWith("pushedKey");
  });

  it("exec enterRoom", () => {

  });

  it("exec exitRoom", () => {

  });

  it("exec updateMember", () => {

  });

  it("exec addAction", () => {

  });

  it("exec updateAction", () => {

  });

  it("exec removeAction", () => {

  });

  describe("isHost", () => {
    it("room.info.host==user.idの場合はisHost=true", () => {
      useSelectorMock.mockReturnValue({
        ...{
          ...initialRoomState,
          info: {
            ...initialRoomState.info,
            host: "hostuserid",
          },
        },
        user: {
          ...userState.user,
          id: "hostuserid"
        },
      });
      const {result} = renderHook(() => useRoomSync());
      expect(result.current.isHost).toBe(true);
    });

    it("room.info.host!=user.idの場合はisHost=true", () => {
      useSelectorMock.mockReturnValue({
        ...{
          ...initialRoomState,
          info: {
            ...initialRoomState.info,
            host: "hostuserid",
          },
        },
        user: {
          ...userState.user,
          id: "nothostuserid"
        },
      });
      const {result} = renderHook(() => useRoomSync());
      expect(result.current.isHost).toBe(false);
    });
  });

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
      const {createRoom} = result.current;
      act(() => {
        createRoom();
      });
      expect(startRoomDBSyncMock).not.toHaveBeenCalled();
      expect(startMembersDBSyncMock).not.toHaveBeenCalled();
      expect(startActionsDBSyncMock).not.toHaveBeenCalled();
    });
    it("enterRoom", () => {
      const {enterRoom} = result.current;
      act(() => {
        enterRoom();
      });
      expect(startRoomDBSyncMock).not.toHaveBeenCalled();
      expect(startMembersDBSyncMock).not.toHaveBeenCalled();
      expect(startActionsDBSyncMock).not.toHaveBeenCalled();
    });
    it("exitRoom", () => {
      const {exitRoom} = result.current;
      act(() => {
        exitRoom();
      });
      expect(stopRoomDBSyncMock).not.toHaveBeenCalled();
      expect(stopMembersDBSyncMock).not.toHaveBeenCalled();
      expect(stopActionsDBSyncMock).not.toHaveBeenCalled();
    });
    it.todo("updateMember");
    it.todo("addAction");
    it.todo("updateAction");
    it.todo("removeAction");
  });
});
