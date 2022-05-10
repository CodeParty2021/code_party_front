import { renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useRunSimulation } from "./useRunSimulation";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { RoomInfo, RoomState, UserState } from "services/RoomSync/RoomSync";
import { IResponse, useRunCodes } from "hooks/CodeAPIHooks/useRunCodes";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/RoomSyncHooks/useRoomSync");
jest.mock("hooks/CodeAPIHooks/useRunCodes");

const useRoomSyncMock = useRoomSync as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useRunCodesMock = useRunCodes as jest.Mock;

const users: { [id: string]: UserState } = {
  userid1: {
    displayName: "user1",
    ready: true,
    status: "waiting",
    codeId: "codeid1",
  },
  userid2: {
    displayName: "user2",
    ready: false,
    status: "watching",
    codeId: "codeid2",
  },
  userid3: {
    displayName: "user3",
    ready: true,
    status: "disconnect",
    codeId: "codeid3",
  },
};

const initialRoomInfo: RoomInfo = {
  host: "userid1",
  name: "roomName",
  status: "watching",
};

const initialRoomState: RoomState = {
  id: "roomId",
  isEntered: true,
  info: initialRoomInfo,
  sortedKeysOfMembers: ["userid3", "userid2", "userid1"],
  members: {
    userid1: users["userid1"],
    userid2: users["userid2"],
    userid3: users["userid3"],
  },
  sortedKeysOfActions: [],
  actions: {},
};

const initialRoomSyncState = {
  room: { ...initialRoomState },
  isHost: true,
  updateRoomInfo: jest.fn(),
};

const initialRunCodesState: IResponse = {
  data: {
    unityUrl: "https://test.com/",
    jsonId: "jsonId",
  },
  runCodes: jest.fn(),
  loading: false,
};

const navigateMock = jest.fn();

describe("useRunSimulation", () => {
  beforeEach(() => {
    useRoomSyncMock.mockReturnValue({ ...initialRoomSyncState });
    useNavigateMock.mockReturnValue(navigateMock);
    useRunCodesMock.mockReturnValue({ ...initialRunCodesState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useRunSimulation());
    expect(result.current).toBeTruthy();
    expect(initialRunCodesState.runCodes).lastCalledWith(
      "codeid3",
      "codeid2",
      "codeid1"
    );
  });

  it("ホストでない場合シミュレーションが実行されない", () => {
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      isHost: false,
    });
    renderHook(() => useRunSimulation());
    expect(initialRunCodesState.runCodes).not.toHaveBeenCalled();
  });

  it("シミュレーション結果が更新されたらDB上のルーム情報を更新", () => {
    useRunCodesMock.mockReturnValue({
      ...initialRunCodesState,
      data: {
        jsonId: "jsonId",
        unityUrl: "https://test.com/",
      },
    });
    renderHook(() => useRunSimulation());
    expect(initialRoomSyncState.updateRoomInfo).lastCalledWith({
      analyzingResult: {
        resultId: "jsonId",
      },
    });
  });

  it("シミュレーションでエラーが発生した場合はDB上のルーム情報を更新", () => {
    useRunCodesMock.mockReturnValue({
      ...initialRunCodesState,
      error: "エラー",
    });
    renderHook(() => useRunSimulation());
    expect(initialRoomSyncState.updateRoomInfo).lastCalledWith({
      analyzingResult: {
        error: "シミュレーション実行中にエラーが発生しました。",
      },
    });
  });
});
