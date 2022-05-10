import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useWaitingRoomState } from "./useWaitingRoomState";
import { useRoomSync } from "hooks/RoomSyncHooks/useRoomSync";
import { IResponse, useFetchCodes } from "hooks/CodeAPIHooks/useFetchCodes";
import { RoomInfo, RoomState, UserState } from "services/RoomSync/RoomSync";
import { useSelector } from "react-redux";

jest.mock("react-router-dom");
jest.mock("hooks/RoomSyncHooks/useRoomSync");
jest.mock("hooks/CodeAPIHooks/useFetchCodes");
jest.mock("react-redux");

const useRoomSyncMock = useRoomSync as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useFetchCodesMock = useFetchCodes as jest.Mock;
const useSelectorMock = useSelector as jest.Mock;

const users: { [id: string]: UserState } = {
  userid1: {
    displayName: "user1",
    ready: true,
    status: "waiting",
  },
  userid2: {
    displayName: "user2",
    ready: false,
    status: "watching",
  },
  userid3: {
    displayName: "user3",
    ready: true,
    status: "waiting",
  },
};

const initialRoomInfo: RoomInfo = {
  host: "userid1",
  name: "roomId",
  status: "waiting",
};

const initialRoomState: RoomState = {
  id: "room id",
  invitationLink: "http://casual-room/invitation/roomId",
  isEntered: true,
  info: initialRoomInfo,
  sortedKeysOfMembers: ["userid1"],
  members: {
    userid1: users["userid1"],
  },
  sortedKeysOfActions: [],
  actions: {},
};

const initialRoomSyncState = {
  room: { ...initialRoomState },
  isHost: true,
  updateRoomInfo: jest.fn(),
  updateMember: jest.fn(),
  updateOtherMember: jest.fn(),
  exitRoom: jest.fn(),
};

const initialFetchCodesState: IResponse = {
  data: [
    {
      id: "codeid1",
      codeContent: "print('hello')",
      createdAt: "2022-02-16T05:05:46.315585+09:00",
      updatedAt: "2022-02-16T06:33:00.058575+09:00",
      language: "1",
      step: "15",
      user: "userid1",
    },
    {
      id: "codeid2",
      codeContent: "alert('hello')",
      createdAt: "2022-02-16T05:05:46.315585+09:00",
      updatedAt: "2022-02-16T06:33:00.058575+09:00",
      language: "2",
      step: "15",
      user: "userid1",
    },
  ],
  loading: false,
  update: jest.fn(),
};

const navigateMock = jest.fn();

describe("useWaitingRoomState", () => {
  beforeEach(() => {
    useRoomSyncMock.mockReturnValue({ ...initialRoomSyncState });
    useFetchCodesMock.mockReturnValue({ ...initialFetchCodesState });
    useNavigateMock.mockReturnValue(navigateMock);
    useSelectorMock.mockReturnValue({
      user: {
        id: "userid1",
        displayName: "ffawefae",
        email: "feaeafa@fafe.com",
        picture: "fewfawefaewf.png",
        jwt: "feefawef390urjfo",
      },
      isLogin: false,
      unRegisterObserver: null,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useWaitingRoomState());
    expect(result.current.roomInfo).toEqual({
      roomId: "room id",
      invitationLink: "http://casual-room/invitation/roomId",
      host: { ...users["userid1"] },
      memberKeys: ["userid1"],
      members: { userid1: users["userid1"] },
      actionKeys: [],
      actions: {},
    });
    expect(result.current.isHost).toEqual(true);
    expect(result.current.status).toEqual("waiting");
    expect(result.current.ready).toEqual(false);
    expect(result.current.code).toEqual({
      codes: initialFetchCodesState.data,
      loading: initialFetchCodesState.loading,
    });
  });

  it("room.isEnter=falseでページ遷移", () => {
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        isEntered: false,
      },
    });
    renderHook(() => useWaitingRoomState());
    expect(navigateMock).lastCalledWith("/casual-battle");
  });

  it("コードが選択されたら準備ボタンが有効化される", () => {
    const { result } = renderHook(() => useWaitingRoomState());
    const { onChangeSelectedCodeId } = result.current;
    //実行前はボタンが無効化状態
    expect(result.current.readyBtnDisabled).toBe(true);
    act(() => {
      onChangeSelectedCodeId("codeId1");
    });
    //実行後はボタンが有効化
    expect(result.current.readyBtnDisabled).toBe(false);
  });

  it("ルームステータスがwaitingからwatchingになったら観戦画面に遷移", () => {
    useRoomSyncMock.mockReturnValueOnce({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        info: {
          ...initialRoomInfo,
          status: "waiting",
        },
      },
    });
    useRoomSyncMock.mockReturnValueOnce({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        info: {
          ...initialRoomInfo,
          status: "watching",
        },
      },
    });
    renderHook(() => useWaitingRoomState());
    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).lastCalledWith("/casual-battle/result");
  });

  it("自分がkickingのユーザならexecRoomが実行される", () => {
    //自分はuserid1ユーザ
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        members: {
          userid1: {
            ...users["userid1"],
            status: "kicking",
          },
        },
      },
    });
    renderHook(() => useWaitingRoomState());
    expect(initialRoomSyncState.exitRoom).toBeCalledTimes(1);
  });

  it("自分以外がkickingのユーザなら何もおこらない", () => {
    //自分はuserid1ユーザ
    useRoomSyncMock.mockReturnValue({
      ...initialRoomSyncState,
      room: {
        ...initialRoomState,
        members: {
          userid2: {
            ...users["userid2"],
            status: "kicking",
          },
        },
      },
    });
    renderHook(() => useWaitingRoomState());
    expect(initialRoomSyncState.exitRoom).toBeCalledTimes(0);
  });

  it("exec readyBtnHandler", () => {
    const { result } = renderHook(() => useWaitingRoomState());

    const { readyBtnHandler } = result.current;

    const num = initialRoomSyncState.updateMember.mock.calls.length;

    //ボタン押下
    act(() => {
      readyBtnHandler();
    });

    //readyが変化しuseEffectが実行される
    expect(initialRoomSyncState.updateMember).toBeCalledTimes(num + 1);
    expect(initialRoomSyncState.updateMember).lastCalledWith({
      ready: true,
      codeId: "",
    });
  });

  it("exec exitBtnHandler", () => {
    const { result } = renderHook(() => useWaitingRoomState());

    const { exitBtnHandler } = result.current;

    //一度も実行されていないことを確認
    expect(initialRoomSyncState.exitRoom).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();

    //ボタン押下
    act(() => {
      exitBtnHandler();
    });

    //実行される．
    expect(initialRoomSyncState.exitRoom).toBeCalledTimes(1);
  });

  it("exec startBtnHandler", () => {
    const { result } = renderHook(() => useWaitingRoomState());

    const { startBtnHandler } = result.current;

    //呼び出し回数を記録
    const num = initialRoomSyncState.updateRoomInfo.mock.calls.length;

    //ボタン押下
    act(() => {
      startBtnHandler();
    });

    //実行される．
    expect(initialRoomSyncState.updateRoomInfo).toBeCalledTimes(num + 1);
    expect(initialRoomSyncState.updateRoomInfo).lastCalledWith({
      status: "watching",
    });
  });

  it("exec onChangeSelectedCodeId", () => {
    const { result } = renderHook(() => useWaitingRoomState());

    const { onChangeSelectedCodeId } = result.current;

    //初期値を確認
    expect(result.current.selectedCodeId).toBe("");

    //ボタン押下
    act(() => {
      onChangeSelectedCodeId("codeid1");
    });

    //反映されたことを確認
    expect(result.current.selectedCodeId).toBe("codeid1");
  });

  it("exec kickUserBtnHandler", () => {
    const { result } = renderHook(() => useWaitingRoomState());

    const { kickUserHandler } = result.current;

    //呼び出し回数を記録
    const num = initialRoomSyncState.updateOtherMember.mock.calls.length;

    //初期値を確認
    expect(result.current.roomInfo).toEqual({
      roomId: "room id",
      invitationLink: "http://casual-room/invitation/roomId",
      host: { ...users["userid1"] },
      memberKeys: ["userid1"],
      members: { userid1: users["userid1"] },
      actionKeys: [],
      actions: {},
    });

    //ボタン押下
    act(() => {
      kickUserHandler("codeid1");
    });

    //実行される．
    expect(initialRoomSyncState.updateOtherMember).toBeCalledTimes(num + 1);
    expect(initialRoomSyncState.updateOtherMember).lastCalledWith("codeid1", {
      status: "kicking",
    });
  });

  describe("ルームステータスのテスト", () => {
    it("全員がWaitingRoomに戻ってきたらroomの状態をwaitingに更新する", () => {
      useRoomSyncMock.mockReturnValue({
        ...initialRoomSyncState,
        room: {
          ...initialRoomState,
          info: {
            ...initialRoomInfo,
            status: "watching",
          },
          members: {
            userid1: users["userid1"],
            userid3: users["userid3"],
          },
          sortedKeysOfMembers: ["userid1", "userid3"],
        } as RoomState,
      });
      renderHook(() => useWaitingRoomState());
      expect(initialRoomSyncState.updateRoomInfo).lastCalledWith({
        status: "waiting",
        analyzingResult: null,
      });
    });

    it("全員がWaitingRoomに戻って来ていない場合，roomの状態は更新されない", () => {
      useRoomSyncMock.mockReturnValue({
        ...initialRoomSyncState,
        room: {
          ...initialRoomState,
          info: {
            ...initialRoomInfo,
            status: "watching",
          },
          members: {
            userid1: users["userid1"],
            userid3: users["userid2"],
          },
          sortedKeysOfMembers: ["userid1", "userid2"],
        } as RoomState,
      });
      renderHook(() => useWaitingRoomState());
      expect(initialRoomSyncState.updateRoomInfo).not.toHaveBeenCalled();
    });

    it("ルームステータスがwaitingの場合，roomの状態は更新されない", () => {
      useRoomSyncMock.mockReturnValue({
        ...initialRoomSyncState,
        room: {
          ...initialRoomState,
          info: {
            ...initialRoomInfo,
            status: "waiting",
          },
          members: {
            userid1: users["userid1"],
            userid3: users["userid3"],
          },
          sortedKeysOfMembers: ["userid1", "userid3"],
        } as RoomState,
      });
      renderHook(() => useWaitingRoomState());
      expect(initialRoomSyncState.updateRoomInfo).not.toHaveBeenCalled();
    });
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

  describe("isCopyBtnClicked", () => {
    // TODO コピー部分のテストを書きたかったが難しかったため挫折...
  });
});
