import { act, renderHook } from "@testing-library/react-hooks";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { uri } from "config";
import { useRunCodes } from "./useRunCodes";
import { axiosWithIdToken } from "axios_config";

jest.mock("firebase_config");

describe("useRunCodes", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("正常系のテスト", async () => {
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseDeta = [
      {
        unityUrl: "https://test.com/",
        jsonId: "resultJsonId",
      },
    ];
    const url = `${uri}/codes/run/`;
    mock.onPost(url).reply(200, mockResponseDeta); // モックAPIを定義

    //実行
    const { result, waitForNextUpdate } = renderHook(() => useRunCodes());
    const runCodes = result.current.runCodes;

    act(() => {
      runCodes("codeId1", "codeId2", "codeId3");
    });

    await waitForNextUpdate();

    expect(result.current.data).toEqual([
      {
        unityUrl: "https://test.com/",
        jsonId: "resultJsonId",
      },
    ]);
    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);

    expect(mock.history["post"][0].url).toEqual("/codes/run/");
    console.log(mock.history["post"][0].params);
    expect(mock.history["post"][0].data).toEqual(
      JSON.stringify({
        code: ["codeId1", "codeId2", "codeId3"],
      })
    );
  });
});
