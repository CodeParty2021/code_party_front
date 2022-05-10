import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useSearchRoomState } from "./useSearchRoomState";
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
  enterRoom: jest.fn(),
};

const navigateMock = jest.fn();

describe("useWaitingRoomState", () => {
  beforeEach(() => {
    useRoomSyncMock.mockReturnValue({ ...initialRoomSyncState });
    useNavigateMock.mockReturnValue(navigateMock);
    initialRoomSyncState.enterRoom.mockResolvedValue({});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useSearchRoomState());
    expect(result.current).toBeTruthy();
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
    renderHook(() => useSearchRoomState());
    expect(navigateMock).lastCalledWith("/casual-battle/waiting-room");
  });

  it("exec roomIdTextBoxChangeHandler", () => {
    const { result } = renderHook(() => useSearchRoomState());
    const { roomIdTextBoxChangeHandler } = result.current;
    act(() => {
      roomIdTextBoxChangeHandler("typed value");
    });
    expect(result.current.roomIdTextBoxValue).toBe("typed value");
  });

  it("exec enterBtnClickHandler", () => {
    const { result } = renderHook(() => useSearchRoomState());
    const { roomIdTextBoxChangeHandler } = result.current;

    act(() => {
      roomIdTextBoxChangeHandler("roomid");
    });

    const { enterBtnClickHandler } = result.current;
    expect(result.current.enterBtnDisabled).toBe(false);
    act(() => {
      enterBtnClickHandler();
    });
    expect(result.current.enterBtnDisabled).toBe(true);
    expect(initialRoomSyncState.enterRoom).lastCalledWith("roomid");
  });
});
