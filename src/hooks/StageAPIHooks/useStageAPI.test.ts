import { renderHook } from "@testing-library/react-hooks";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { uri } from "config";
import { axiosWithIdToken } from "axios_config";
import { GetStageResponseType, useStageAPI } from "./useStageAPI";
import { act } from "react-dom/test-utils";

jest.mock("react-redux");
jest.mock("firebase_config");

describe("useStageAPI", () => {
  beforeEach(() => {
    // selectorのレスポンスを設定する
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseData: GetStageResponseType = {
      id: 1,
      objective: "真っ直ぐ歩くプログラムを書こう",
      movie_url: "http://sample.com/",
      index: 1,
      world: 1,
    };
    const url = `${uri}/stages/1/`;
    mock.onGet(url).reply(200, mockResponseData); // モックAPIを定義
    const url2 = `${uri}/stages/2/`;
    mock.onGet(url2).reply(404, {});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("getStageTestCommonCase", async () => {
    //実行
    const { result } = renderHook(() => useStageAPI());
    expect(result.current.error).toEqual(undefined);
    await expect(result.current.getStage(1)).resolves.toEqual({
      id: 1,
      objective: "真っ直ぐ歩くプログラムを書こう",
      movie_url: "http://sample.com/",
      index: 1,
      world: 1,
    });
  });
  test("getStageTestErrorCase", async () => {
    //実行
    const { result, waitForNextUpdate } = renderHook(() => useStageAPI());
    expect(result.current.error).toEqual(undefined);
    const getStage = result.current.getStage;
    act(() => {
      expect(() => getStage(2)).rejects.toThrow(Error);
    });
    await waitForNextUpdate();
    expect(result.current.error).toEqual(
      "GetStageResponseError Error: Request failed with status code 404"
    );
  });
});
