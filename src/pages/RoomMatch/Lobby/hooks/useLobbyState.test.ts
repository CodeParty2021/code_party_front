import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import { useLobbyState } from "./useLobbyState";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { useRef } from "react";

jest.mock("react-router-dom");
jest.mock("hooks/RoomSyncHooks/useRoomSync");
jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

const useRoomSyncMock = useRoomSync as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useRefMock = useRef as jest.Mock;

const initialRoomState = {
  isEntered: false,
  sortedKeysOfMembers: [],
  members: {},
  sortedKeysOfActions: [],
  actions: {},
};

const initialRoomSyncState = {
  room: { ...initialRoomState },
  createRoom: jest.fn(),
  enterRoom: jest.fn(),
};

const navigateMock = jest.fn();

describe("useLobbyState", () => {
  beforeEach(() => {
    useRoomSyncMock.mockReturnValue({ ...initialRoomSyncState });
    useNavigateMock.mockReturnValue(navigateMock);
    initialRoomSyncState.createRoom.mockResolvedValue({});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useLobbyState());
    expect(result.current).toBeTruthy();
  });

  it("room.isEntered=trueでページ遷移", () => {
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        isEntered: true,
      },
    });
    renderHook(() => useLobbyState());
    expect(navigateMock).lastCalledWith("/room-match/waiting-room");
  });

  it("exec roomCreateBtnHandler", () => {
    const { result } = renderHook(() => useLobbyState());
    const { createRoomHandler } = result.current;
    act(() => {
      createRoomHandler();
    });
    expect(initialRoomSyncState.createRoom).toBeCalledTimes(1);
  });

  it("exec enterRoomHandler 正常系", async () => {
    const mRef = { current: { value: "roomId" } };
    useRefMock.mockReturnValue(mRef);
    initialRoomSyncState.enterRoom.mockResolvedValue({});

    const { result } = renderHook(() => useLobbyState());
    const { enterRoomHandler } = result.current;
    await act(async () => {
      await enterRoomHandler();
    });
    expect(result.current.errorMessage).toBe("");
    expect(initialRoomSyncState.enterRoom).toBeCalledTimes(1);
    expect(initialRoomSyncState.enterRoom).toHaveBeenCalledWith("roomId");
  });

  it("exec enterRoomHandler 不正入力", async () => {
    const mRef = { current: { value: 0 } };
    useRefMock.mockReturnValue(mRef);
    initialRoomSyncState.enterRoom.mockResolvedValue({});

    const { result } = renderHook(() => useLobbyState());
    const { enterRoomHandler } = result.current;
    await act(async () => {
      await enterRoomHandler();
    });
    expect(result.current.errorMessage).toBe("入力が不正です。");
    expect(initialRoomSyncState.enterRoom).toBeCalledTimes(0);
  });

  it("exec enterRoomHandler 空入力", async () => {
    const mRef = { current: { value: "" } };
    useRefMock.mockReturnValue(mRef);
    initialRoomSyncState.enterRoom.mockResolvedValue({});

    const { result } = renderHook(() => useLobbyState());
    const { enterRoomHandler } = result.current;
    await act(async () => {
      await enterRoomHandler();
    });
    expect(result.current.errorMessage).toBe("値を入力してください。");
    expect(initialRoomSyncState.enterRoom).toBeCalledTimes(0);
  });
});
