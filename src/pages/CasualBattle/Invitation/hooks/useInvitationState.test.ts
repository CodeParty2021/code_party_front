import { act, renderHook } from "@testing-library/react-hooks";
import { Params, useNavigate, useParams } from "react-router-dom";

import { useInvitationState } from "./useInvitationState";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { useSelector } from "react-redux";
import { UserState } from "services/user/user";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/RoomSyncHooks/useRoomSync");

const useRoomSyncMock = useRoomSync as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useSelectorMock = useSelector as jest.Mock<UserState>;
const useParamsMock = useParams as jest.Mock<Params<string>>;
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
    useSelectorMock.mockReturnValue({
      user: null,
      isLogin: true,
      unRegisterObserver: null,
    });
    useParamsMock.mockReturnValue({
      roomId: "1234",
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useInvitationState());
    expect(result.current).toBeTruthy();
    expect(result.current.isLogin).toBe(true);
  });

  it("room.isEntered=trueでページ遷移", () => {
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        isEntered: true,
      },
    });
    renderHook(() => useInvitationState());
    expect(navigateMock).lastCalledWith("/casual-battle/waiting-room");
  });
  it("exec enterBtnClickHandler", () => {
    const { result } = renderHook(() => useInvitationState());
    const enterBtnClickHandler = result.current.enterBtnClickHandler;

    expect(result.current.enterBtnDisabled).toBe(false);
    act(() => {
      enterBtnClickHandler();
    });
    expect(result.current.enterBtnDisabled).toBe(true);
  });
});
