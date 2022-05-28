import { act, renderHook } from "@testing-library/react-hooks";
import { Params, useNavigate, useParams } from "react-router-dom";

import { useInvitationState } from "./useInvitationState";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { useSelector } from "react-redux";
import { LoginUserState } from "services/user/user";
import { getRoomAsync } from "services/RoomSync/DBOperator/DBOperator";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/RoomSyncHooks/useRoomSync");
jest.mock("services/RoomSync/DBOperator/DBOperator");

const useRoomSyncMock = useRoomSync as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useSelectorMock = useSelector as jest.Mock<LoginUserState>;
const useParamsMock = useParams as jest.Mock<Params<string>>;
const getRoomAsyncMock = getRoomAsync as jest.Mock;
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
    getRoomAsyncMock.mockResolvedValue(undefined);
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
