import { act, renderHook } from "@testing-library/react-hooks";
import {
  getRoomAsync,
  getMemberAsync,
} from "services/RoomSync/DBOperator/DBOperator";
import { RoomInfo, UserState } from "services/RoomSync/RoomSync";
import { useFetchHost } from "./useFetchHost";

jest.mock("react-redux");
jest.mock("firebase_config");
jest.mock("services/RoomSync/DBOperator/DBOperator");

const getRoomAsyncMock = getRoomAsync as jest.Mock<
  Promise<RoomInfo | undefined>
>;
const getMemberAsyncMock = getMemberAsync as jest.Mock<
  Promise<UserState | undefined>
>;

describe("useFetchHost", () => {
  beforeEach(() => {
    getRoomAsyncMock.mockResolvedValue({
      name: "roomName",
      host: "hostId",
      status: "waiting",
    });
    getMemberAsyncMock.mockResolvedValue({
      displayName: "hostName",
      status: "waiting",
      ready: false,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("正常系のテスト", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchHost());
    const getHost = result.current.getHost;

    // 実行
    act(() => {
      getHost("roomId");
    });

    await waitForNextUpdate();

    // 実行値確認
    expect(result.current.data).toEqual({
      displayName: "hostName",
      status: "waiting",
      ready: false,
    });
    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
  });
});
