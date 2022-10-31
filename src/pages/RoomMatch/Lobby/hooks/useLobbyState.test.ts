import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useLobbyState } from "./useLobbyState";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";

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
  room: { ...initialRoomState },
  createRoom: jest.fn(),
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
    const { roomCreateBtnHandler } = result.current;
    expect(result.current.roomCreateBtnDisabled).toBe(false);
    act(() => {
      roomCreateBtnHandler();
    });
    expect(result.current.roomCreateBtnDisabled).toBe(true);
    expect(initialRoomSyncState.createRoom).toBeCalledTimes(1);
  });

  it("exec roomSearchBtnHandler", () => {
    const { result } = renderHook(() => useLobbyState());
    const { roomSearchBtnHandler } = result.current;
    act(() => {
      roomSearchBtnHandler();
    });
    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).lastCalledWith("/room-match/search-room");
  });
});
