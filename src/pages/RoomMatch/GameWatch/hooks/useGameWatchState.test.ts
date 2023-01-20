import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useGameWatchState } from "./useGameWatchState";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { RoomInfo, RoomState } from "services/RoomSync/RoomSync";
import { IResponse, useFetchResult } from "hooks/ResultAPIHooks/useFetchResult";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/RoomSyncHooks/useRoomSync");
jest.mock("hooks/ResultAPIHooks/useFetchResult");

const useRoomSyncMock = useRoomSync as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useFetchResultMock = useFetchResult as jest.Mock;

const initialRoomInfo: RoomInfo = {
  host: "hostId",
  name: "roomName",
  status: "watching",
};

const initialRoomState: RoomState = {
  id: "roomId",
  isEntered: true,
  info: initialRoomInfo,
  sortedKeysOfMembers: [],
  members: {},
  sortedKeysOfActions: [],
  actions: {},
};

const initialRoomSyncState = {
  room: { ...initialRoomState },
  updateMember: jest.fn(),
};

const initialFetchResultState: IResponse = {
  data: {
    id: "resultId",
    jsonPath: "/tmp/path",
    step: 15,
    codes: ["codeId1", "codeId2", "codeId3"],
  },
  fetchResult: jest.fn(),
  loading: false,
};

const navigateMock = jest.fn();

describe("useGameWatchState", () => {
  beforeEach(() => {
    useRoomSyncMock.mockReturnValue({ ...initialRoomSyncState });
    useNavigateMock.mockReturnValue(navigateMock);
    useFetchResultMock.mockReturnValue({ ...initialFetchResultState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useGameWatchState());
    expect(result).toBeTruthy();
    expect(initialRoomSyncState.updateMember).lastCalledWith({
      status: "watching",
    });
  });

  it("room.isEntered=falseでページ遷移", () => {
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        isEntered: false,
      },
    });
    renderHook(() => useGameWatchState());
    expect(navigateMock).lastCalledWith("/room-match");
  });

  it("exec exitBtnHandler", () => {
    const { result } = renderHook(() => useGameWatchState());
    const { exitBtnHandler } = result.current;
    act(() => {
      exitBtnHandler();
    });
    expect(navigateMock).lastCalledWith("/room-match/waiting-room");
  });
});
