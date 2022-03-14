import { renderHook } from "@testing-library/react-hooks";
import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { useDispatch, useSelector } from "react-redux";
import {
  RoomInfo,
  RoomState,
  UserAction,
  UserState,
} from "services/RoomSync/RoomSync";
import { User, UserState as ServiceUserState } from "services/user/user";
import { RootState } from "store";

import * as useRoomSyncModule from "./useRoomSync";

const { useRoomSync, isHost } = useRoomSyncModule;

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

jest.mock("services/RoomSync/RoomSync");

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;
const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const users: { [id: string]: UserState } = {
  userid1: {
    displayName: "user1",
    ready: true,
  },
  userid2: {
    displayName: "user2",
    ready: false,
  },
  userid3: {
    displayName: "user3",
    ready: true,
  },
};

const actions: { [id: string]: UserAction } = {
  actionid1: {
    actionId: 1,
    userId: "userid1",
  },
  actionid2: {
    actionId: 2,
    userId: "userid2",
  },
  actionid3: {
    actionId: 3,
    userId: "userid3",
  },
};

const initialRoomInfo: RoomInfo = {
  name: "room's name",
  host: "userid1",
  status: "waiting",
};

const initialRoomState: RoomState = {
  id: "roomid",
  isEntered: true,
  info: { ...initialRoomInfo },
  sortedKeysOfMembers: ["userid1"],
  members: { userid1: users["userid1"] },
  sortedKeysOfActions: ["actionid1"],
  actions: { actionid1: actions["actionid1"] },
};

const userState: ServiceUserState = {
  isLogin: true,
  unRegisterObserver: null,
  user: {
    id: "userid1",
    displayName: "user1",
    email: "test@test.com",
    picture: "user pic",
    jwt: "user jwt",
  },
};

const initialState: RootState = {
  room: { ...initialRoomState },
  stages: {
    stageList: [],
  },
  user: { ...userState },
};

describe("Test Cases for useRoomSync", () => {
  let store = mockStore();

  beforeEach(() => {
    store = mockStore({ ...initialState });
    useSelectorMock.mockImplementation((func: Function) =>
      func(store.getState())
    );
    useDispatchMock.mockReturnValue(jest.fn());
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useRoomSync());
    expect(result.current.room).toEqual({ ...initialRoomState });
    expect(result.current.isHost).toBe(true);
  });
});

describe("Test Cases for functions in useRoomSync", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("test of isHost", () => {
    it("正常系（ユーザがホストの場合）", () => {
      expect(
        isHost(
          {
            ...initialRoomState,
            info: {
              ...initialRoomInfo,
              host: "hostUserId",
            },
          } as RoomState,
          {
            ...userState.user,
            id: "hostUserId",
          } as User
        )
      ).toBeTruthy();
    });

    it("正常系（ユーザがホストでない場合）", () => {
      expect(
        isHost(
          {
            ...initialRoomState,
            info: {
              ...initialRoomInfo,
              host: "hostUserId",
            },
          } as RoomState,
          {
            ...userState.user,
            id: "notHostUserId",
          } as User
        )
      ).toBeFalsy();
    });

    it("異常系（room.infoがない場合）", () => {
      expect(
        isHost(
          {
            ...initialRoomState,
            info: undefined,
          } as RoomState,
          {
            ...userState.user,
            id: "hostUserId",
          } as User
        )
      ).toBeFalsy();
    });

    it("異常系（userがundefinedの場合）", () => {
      expect(
        isHost(
          {
            ...initialRoomState,
            info: {
              ...initialRoomInfo,
              host: "hostUserId",
            },
          } as RoomState,
          undefined
        )
      ).toBeFalsy();
    });
  });

  //以降はfirebase rules-unit-testingの整備が整ってからテストを実装
  describe("test of createRoomAsync", () => {
    it.todo("正常系");
  });

  describe("test of enterRoomAsync", () => {
    it.todo("正常系");
  });

  describe("test of exitRoomAsync", () => {
    it.todo("正常系");
  });

  describe("test of exitRoomAsHostAsync", () => {
    it.todo("正常系");
  });

  describe("test of moveHostNextAsync", () => {
    it.todo("正常系");
  });

  describe("test of moveHostAsync", () => {
    it.todo("正常系");
  });
});
