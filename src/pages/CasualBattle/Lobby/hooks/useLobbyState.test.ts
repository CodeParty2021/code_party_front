import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useLobbyState } from "./useLobbyState";
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
  room: { ...initialRoomState },
  createRoom: jest.fn(),
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
    const result = renderHook(() => useLobbyState());
    expect(result).toBeTruthy();
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
    renderHook(() => useLobbyState());
    expect(spyNavigate).lastCalledWith("/casual-battle/waiting-room");
  });

  it("exec roomCreateBtnHandler", () => {
    const spyCreateRoom = jest.spyOn(initialRoomSyncState, "createRoom");
    const { result } = renderHook(() => useLobbyState());
    const { roomCreateBtnHandler } = result.current;
    act(() => {
      roomCreateBtnHandler();
    });
    expect(spyCreateRoom).toBeCalledTimes(1);
  });

  it("exec roomSearchBtnHandler", () => {
    const spyNavigate = jest.spyOn(navigateMock, "do");
    const { result } = renderHook(() => useLobbyState());
    const { roomSearchBtnHandler } = result.current;
    act(() => {
      roomSearchBtnHandler();
    });
    expect(spyNavigate).toBeCalledTimes(1);
    expect(spyNavigate).lastCalledWith("/casual-battle/search-room");
  });
});
