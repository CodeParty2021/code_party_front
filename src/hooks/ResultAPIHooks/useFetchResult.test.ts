import { act, renderHook } from "@testing-library/react-hooks";
import { axiosWithIdToken } from "axios_config";
import MockAdapter from "axios-mock-adapter";

import { uri } from "config";
import { useFetchResult } from "./useFetchResult";
import { AxiosInstance } from "axios";

describe("useFetchResult", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("正常系のテスト", async () => {
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseDeta = [
      {
        id: "resultId",
        jsonPath: "/tmp/jsonPath",
        step: 15,
        codes: ["codeId1", "codeId2", "codeId3"],
      },
    ];
    const url = `${uri}/results/resultId/`;
    mock.onGet(url).reply(200, mockResponseDeta); // モックAPIを定義

    //実行
    const { result, waitForNextUpdate } = renderHook(() => useFetchResult());
    const fetchResult = result.current.fetchResult;

    act(() => {
      fetchResult("resultId");
    });

    await waitForNextUpdate();

    expect(result.current.data).toEqual([
      {
        id: "resultId",
        jsonPath: "/tmp/jsonPath",
        step: 15,
        codes: ["codeId1", "codeId2", "codeId3"],
      },
    ]);
    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);

    expect(mock.history["get"][0].url).toEqual("/results/resultId/");
  });
});
