import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";

import {
  child,
  onChildAdded,
  onChildChanged,
  onChildMoved,
  onChildRemoved,
  onValue,
  ref,
} from "firebase/database";
import { RootState } from "store";
import { AnyAction } from "redux";
import {
  startActionsDBSync,
  startMembersDBSync,
  startRoomDBSync,
  stopActionsDBSync,
  stopMembersDBSync,
  stopRoomDBSync,
} from "./DBListener";

jest.mock("firebase/database");

const refMock = ref as jest.Mock;
const childMock = child as jest.Mock;
const onChildAddedMock = onChildAdded as jest.Mock;
const onChildChangedMock = onChildChanged as jest.Mock;
const onChildMovedMock = onChildMoved as jest.Mock;
const onChildRemovedMock = onChildRemoved as jest.Mock;
const onValueMock = onValue as jest.Mock;

const unsubscribeOnChildAdded = jest.fn();
const unsubscribeonChildChanged = jest.fn();
const unsubscribeonChildMoved = jest.fn();
const unsubscribeonChildRemoved = jest.fn();
const unsubscribeonValue = jest.fn();

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;
const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

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
    afterEach(() => {
      jest.resetAllMocks();
    });

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
    afterEach(() => {
      jest.resetAllMocks();
    });

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
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("正常系", async () => {
      await store.dispatch(startMembersDBSync("roomId"));
      expect(onChildAddedMock).toBeCalledTimes(1);
      expect(onChildChangedMock).toBeCalledTimes(1);
      expect(onChildMovedMock).toBeCalledTimes(1);
      expect(onChildRemovedMock).toBeCalledTimes(1);
      expect(onChildAddedMock.mock.calls[0][0]).toBe("/RoomApp/members/roomId"); //第一引数
      expect(onChildChangedMock.mock.calls[0][0]).toBe("/RoomApp/members/roomId"); //第一引数
      expect(onChildMovedMock.mock.calls[0][0]).toBe("/RoomApp/members/roomId"); //第一引数
      expect(onChildRemovedMock.mock.calls[0][0]).toBe("/RoomApp/members/roomId"); //第一引数
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
    afterEach(() => {
      jest.resetAllMocks();
    });

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
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("正常系", async () => {
      await store.dispatch(startActionsDBSync("roomId"));
      expect(onChildAddedMock).toBeCalledTimes(1);
      expect(onChildChangedMock).toBeCalledTimes(1);
      expect(onChildMovedMock).toBeCalledTimes(1);
      expect(onChildRemovedMock).toBeCalledTimes(1);
      expect(onChildAddedMock.mock.calls[0][0]).toBe("/RoomApp/actions/roomId"); //第一引数
      expect(onChildChangedMock.mock.calls[0][0]).toBe("/RoomApp/actions/roomId"); //第一引数
      expect(onChildMovedMock.mock.calls[0][0]).toBe("/RoomApp/actions/roomId"); //第一引数
      expect(onChildRemovedMock.mock.calls[0][0]).toBe("/RoomApp/actions/roomId"); //第一引数
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
    afterEach(() => {
      jest.resetAllMocks();
    });

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
});
