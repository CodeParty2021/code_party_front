import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";

import {
  child,
  onChildAdded,
  onChildChanged,
  onChildMoved,
  onChildRemoved,
  onDisconnect,
  onValue,
  ref,
} from "firebase/database";
import { RootState } from "store";
import { AnyAction } from "redux";
import {
  cancelUserStateOnDisconnect,
  removeUserStateOnDisconnect,
  setUserStateOnDisconnect,
  setUserStateWithPriorityOnDisconnect,
  startActionsDBSync,
  startMembersDBSync,
  startRoomDBSync,
  stopActionsDBSync,
  stopMembersDBSync,
  stopRoomDBSync,
  updateUserStateOnDisconnect,
} from "./DBListener";
import { UserState } from "../RoomSync";

jest.mock("firebase/database");

const refMock = ref as jest.Mock;
const childMock = child as jest.Mock;
const onChildAddedMock = onChildAdded as jest.Mock;
const onChildChangedMock = onChildChanged as jest.Mock;
const onChildMovedMock = onChildMoved as jest.Mock;
const onChildRemovedMock = onChildRemoved as jest.Mock;
const onValueMock = onValue as jest.Mock;
const onDisconnectMock = onDisconnect as jest.Mock;

const unsubscribeOnChildAdded = jest.fn();
const unsubscribeonChildChanged = jest.fn();
const unsubscribeonChildMoved = jest.fn();
const unsubscribeonChildRemoved = jest.fn();
const unsubscribeonValue = jest.fn();
const disconnectFunc = {
  set: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  setWithPriority: jest.fn(),
  cancel: jest.fn(),
};

type DispatchExts = ThunkDispatch<RootState, undefined, AnyAction>;
const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const users: { [id: string]: UserState } = {
  userId: {
    displayName: "user's name",
    ready: true,
    status: "waiting",
  },
};

const initialState: RootState = {
  room: {
    isEntered: false,
    members: {},
    sortedKeysOfMembers: [],
    actions: {},
    sortedKeysOfActions: [],
  },
  stages: {
    stageList: [],
  },
  steps: {
    stepList: [],
  },
  user: {
    isLogin: false,
    unRegisterObserver: null,
    user: null,
  },
};

describe("Test Cases for Reducers of DBListener", () => {
  let store = mockStore();
  beforeEach(async () => {
    refMock.mockImplementation((ref: any, path: string) => path);
    childMock.mockImplementation((ref: any, path: string) => {
      return `${ref}/${path}`;
    });
    onChildAddedMock.mockReturnValue(unsubscribeOnChildAdded);
    onChildChangedMock.mockReturnValue(unsubscribeonChildChanged);
    onChildMovedMock.mockReturnValue(unsubscribeonChildMoved);
    onChildRemovedMock.mockReturnValue(unsubscribeonChildRemoved);
    onValueMock.mockReturnValue(unsubscribeonValue);
    onDisconnectMock.mockReturnValue(disconnectFunc);
    store = mockStore(initialState);

    //毎回コールバックをすべて削除する．
    store.dispatch(stopRoomDBSync());
    store.dispatch(stopMembersDBSync());
    store.dispatch(stopActionsDBSync());
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("test of startRoomDBSync", () => {
    it("正常系", async () => {
      await store.dispatch(startRoomDBSync("roomId"));
      expect(onValueMock).toBeCalledTimes(1);
      expect(onValueMock.mock.calls[0][0]).toBe("/RoomApp/rooms/roomId"); //第一引数
    });

    it("異常系１（ルームIDが空文字列の場合）", async () => {
      await store.dispatch(startRoomDBSync(""));
      expect(onValueMock).toBeCalledTimes(0);
    });
  });

  describe("test of stopRoomDBSync", () => {
    it("正常系", async () => {
      await store.dispatch(startRoomDBSync("roomId"));
      await store.dispatch(stopRoomDBSync());
      expect(unsubscribeonValue).toBeCalledTimes(1);
    });

    it("異常系１（startRoomDBSyncが事前に実行されていない場合）", async () => {
      await store.dispatch(stopRoomDBSync());
      expect(unsubscribeonValue).toBeCalledTimes(0);
    });
  });

  describe("test of startMembersDBSync", () => {
    it("正常系", async () => {
      await store.dispatch(startMembersDBSync("roomId"));
      expect(onChildAddedMock).toBeCalledTimes(1);
      expect(onChildChangedMock).toBeCalledTimes(1);
      expect(onChildMovedMock).toBeCalledTimes(1);
      expect(onChildRemovedMock).toBeCalledTimes(1);
      expect(onChildAddedMock.mock.calls[0][0]).toBe("/RoomApp/members/roomId"); //第一引数
      expect(onChildChangedMock.mock.calls[0][0]).toBe(
        "/RoomApp/members/roomId"
      ); //第一引数
      expect(onChildMovedMock.mock.calls[0][0]).toBe("/RoomApp/members/roomId"); //第一引数
      expect(onChildRemovedMock.mock.calls[0][0]).toBe(
        "/RoomApp/members/roomId"
      ); //第一引数
    });

    it("異常系１（ルームIDが空文字列の場合）", async () => {
      await store.dispatch(startMembersDBSync(""));
      expect(onChildAddedMock).toBeCalledTimes(0);
      expect(onChildChangedMock).toBeCalledTimes(0);
      expect(onChildMovedMock).toBeCalledTimes(0);
      expect(onChildRemovedMock).toBeCalledTimes(0);
    });
  });

  describe("test of stopMembersDBSync", () => {
    it("正常系", async () => {
      await store.dispatch(startMembersDBSync("roomId"));
      await store.dispatch(stopMembersDBSync());
      expect(unsubscribeOnChildAdded).toBeCalledTimes(1);
      expect(unsubscribeonChildChanged).toBeCalledTimes(1);
      expect(unsubscribeonChildMoved).toBeCalledTimes(1);
      expect(unsubscribeonChildRemoved).toBeCalledTimes(1);
    });

    it("異常系１（startMembersDBSyncが事前に実行されていない場合）", async () => {
      await store.dispatch(stopMembersDBSync());
      expect(unsubscribeOnChildAdded).toBeCalledTimes(0);
      expect(unsubscribeonChildChanged).toBeCalledTimes(0);
      expect(unsubscribeonChildMoved).toBeCalledTimes(0);
      expect(unsubscribeonChildRemoved).toBeCalledTimes(0);
    });
  });

  describe("test of startActionsDBSync", () => {
    it("正常系", async () => {
      await store.dispatch(startActionsDBSync("roomId"));
      expect(onChildAddedMock).toBeCalledTimes(1);
      expect(onChildChangedMock).toBeCalledTimes(1);
      expect(onChildMovedMock).toBeCalledTimes(1);
      expect(onChildRemovedMock).toBeCalledTimes(1);
      expect(onChildAddedMock.mock.calls[0][0]).toBe("/RoomApp/actions/roomId"); //第一引数
      expect(onChildChangedMock.mock.calls[0][0]).toBe(
        "/RoomApp/actions/roomId"
      ); //第一引数
      expect(onChildMovedMock.mock.calls[0][0]).toBe("/RoomApp/actions/roomId"); //第一引数
      expect(onChildRemovedMock.mock.calls[0][0]).toBe(
        "/RoomApp/actions/roomId"
      ); //第一引数
    });

    it("異常系１（ルームIDが空文字列の場合）", async () => {
      await store.dispatch(startActionsDBSync(""));
      expect(onChildAddedMock).toBeCalledTimes(0);
      expect(onChildChangedMock).toBeCalledTimes(0);
      expect(onChildMovedMock).toBeCalledTimes(0);
      expect(onChildRemovedMock).toBeCalledTimes(0);
    });
  });

  describe("test of stopActionsDBSync", () => {
    it("正常系", async () => {
      await store.dispatch(startActionsDBSync("roomId"));
      await store.dispatch(stopActionsDBSync());
      expect(unsubscribeOnChildAdded).toBeCalledTimes(1);
      expect(unsubscribeonChildChanged).toBeCalledTimes(1);
      expect(unsubscribeonChildMoved).toBeCalledTimes(1);
      expect(unsubscribeonChildRemoved).toBeCalledTimes(1);
    });

    it("異常系１（startActionsDBSyncが事前に実行されていない場合）", async () => {
      await store.dispatch(stopActionsDBSync());
      expect(unsubscribeOnChildAdded).toBeCalledTimes(0);
      expect(unsubscribeonChildChanged).toBeCalledTimes(0);
      expect(unsubscribeonChildMoved).toBeCalledTimes(0);
      expect(unsubscribeonChildRemoved).toBeCalledTimes(0);
    });
  });

  describe("onDisconnectのテスト", () => {
    it("setUserStateOnDisconnect", () => {
      setUserStateOnDisconnect("roomId", "userId", users["userId"]);
      expect(onDisconnect).lastCalledWith("/RoomApp/members/roomId/userId");
      expect(disconnectFunc.set).lastCalledWith(users["userId"]);
    });
    it("updateUserStateOnDisconnect", () => {
      updateUserStateOnDisconnect("roomId", "userId", {
        displayName: "update user",
        status: "disconnect",
        codeId: null,
      });
      expect(onDisconnect).lastCalledWith("/RoomApp/members/roomId/userId");
      expect(disconnectFunc.update).lastCalledWith({
        displayName: "update user",
        status: "disconnect",
        codeId: null,
      });
    });
    it("removeUserStateOnDisconnect", () => {
      removeUserStateOnDisconnect("roomId", "userId");
      expect(onDisconnect).lastCalledWith("/RoomApp/members/roomId/userId");
      expect(disconnectFunc.remove).toBeCalledTimes(1);
    });
    it("setUserStateWithPriorityOnDisconnect", () => {
      setUserStateWithPriorityOnDisconnect(
        "roomId",
        "userId",
        users["userId"],
        1
      );
      expect(onDisconnect).lastCalledWith("/RoomApp/members/roomId/userId");
      expect(disconnectFunc.setWithPriority).lastCalledWith(users["userId"], 1);
    });
    it("cancelUserStateOnDisconnect", () => {
      cancelUserStateOnDisconnect("roomId", "userId");
      expect(onDisconnect).lastCalledWith("/RoomApp/members/roomId/userId");
      expect(disconnectFunc.cancel).toBeCalledTimes(1);
    });
  });
});
