import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useWaitingRoomState } from "./useWaitingRoomState";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { UserState } from "services/RoomSync/RoomSync";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/RoomSyncHooks/useRoomSync");

const useRoomSyncMock = useRoomSync as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;

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

const initialRoomState = {
  id: "room id",
  isEntered: true,
  info: {
    host: "userid1",
  },
  sortedKeysOfMembers: ["userid1"],
  members: { userid1: users["userid1"] },
  sortedKeysOfActions: [],
  actions: {},
};

const initialRoomSyncState = {
  room: { ...initialRoomState },
  isHost: true,
  updateMember: jest.fn(),
  exitRoom: jest.fn(),
};

const navigateMock = { do: jest.fn() };

describe("useWaitingRoomState", () => {
  beforeEach(() => {
    useRoomSyncMock.mockReturnValue({ ...initialRoomSyncState });
    useNavigateMock.mockReturnValue(navigateMock.do);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useWaitingRoomState());
    expect(result.current.roomInfo).toEqual({
      roomId: "room id",
      host: { ...users["userid1"] },
      memberKeys: ["userid1"],
      members: { userid1: users["userid1"] },
      actionKeys: [],
      actions: {},
    });
    expect(result.current.isHost).toEqual(true);
  });

  it("room.isEntere:falseでページ遷移", () => {
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        isEntered: false,
      },
    });
    const spyNavigate = jest.spyOn(navigateMock, "do");
    renderHook(() => useWaitingRoomState());
    expect(spyNavigate).lastCalledWith("/casual-battle");
  });

  it("exec readyBtnHandler", async () => {
    const spyUpdateMember = jest.spyOn(initialRoomSyncState, "updateMember");
    const { result } = renderHook(() => useWaitingRoomState());

    const { readyBtnHandler } = result.current;

    //useEffectで一回実行される
    expect(spyUpdateMember).toBeCalledTimes(1);
    expect(spyUpdateMember).lastCalledWith({ ready: false });

    //ボタン押下
    act(() => {
      readyBtnHandler();
    });

    //readyが変化しuseEffectが実行される
    expect(spyUpdateMember).toBeCalledTimes(2);
    expect(spyUpdateMember).lastCalledWith({ ready: true });
  });

  it("exec exitBtnHandler", async () => {
    const spyExitRoom = jest.spyOn(initialRoomSyncState, "exitRoom");
    const spyNavigate = jest.spyOn(navigateMock, "do");
    const { result } = renderHook(() => useWaitingRoomState());

    const { exitBtnHandler } = result.current;

    //一度も実行されていないことを確認
    expect(spyExitRoom).not.toHaveBeenCalled();
    expect(spyNavigate).not.toHaveBeenCalled();

    //ボタン押下
    act(() => {
      exitBtnHandler();
    });

    //それぞれ実行される．
    expect(spyExitRoom).toBeCalledTimes(1);
  });

  it("exec startBtnHandler", async () => {
    const spyNavigate = jest.spyOn(navigateMock, "do");
    const { result } = renderHook(() => useWaitingRoomState());

    const { startBtnHandler } = result.current;

    //一度も実行されていないことを確認
    expect(spyNavigate).not.toHaveBeenCalled();

    //ボタン押下
    act(() => {
      startBtnHandler();
    });

    //それぞれ実行される．
    expect(spyNavigate).lastCalledWith("/casual-battle/result");
  });

  describe("startBtnDisabled", () => {
    it("isHost: trueかつready: falseの人が存在する場合", () => {
      useRoomSyncMock.mockReturnValue({
        ...initialRoomSyncState,
        isHost: true,
        room: {
          ...initialRoomState,
          sortedKeysOfMembers: ["userid1", "userid2"],
          members: { userid1: users["userid1"], userid2: users["userid2"] },
        },
      });
      const { result } = renderHook(() => useWaitingRoomState());
      expect(result.current.startBtnDisabled).toBe(true);
    });
    it("isHost: trueかつ全員がready: trueの場合", () => {
      useRoomSyncMock.mockReturnValue({
        ...initialRoomSyncState,
        isHost: true,
        room: {
          ...initialRoomState,
          sortedKeysOfMembers: ["userid1", "userid3"],
          members: { userid1: users["userid1"], userid3: users["userid3"] },
        },
      });
      const { result } = renderHook(() => useWaitingRoomState());
      expect(result.current.startBtnDisabled).toBe(false);
    });
    it("isHost: falseかつready: falseの人が存在する場合", () => {
      useRoomSyncMock.mockReturnValue({
        ...initialRoomSyncState,
        isHost: false,
        room: {
          ...initialRoomState,
          sortedKeysOfMembers: ["userid1", "userid2"],
          members: { userid1: users["userid1"], userid2: users["userid2"] },
        },
      });
      const { result } = renderHook(() => useWaitingRoomState());
      expect(result.current.startBtnDisabled).toBe(true);
    });
    it("isHost: falseかつ全員がready: trueの場合", () => {
      useRoomSyncMock.mockReturnValue({
        ...initialRoomSyncState,
        isHost: false,
        room: {
          ...initialRoomState,
          sortedKeysOfMembers: ["userid1", "userid3"],
          members: { userid1: users["userid1"], userid3: users["userid3"] },
        },
      });
      const { result } = renderHook(() => useWaitingRoomState());
      expect(result.current.startBtnDisabled).toBe(true);
    });
  });
});
