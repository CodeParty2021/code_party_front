import { renderHook } from "@testing-library/react-hooks";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { uri } from "config";
import { axiosWithIdToken } from "axios_config";
import { GetWorldResponseType, useWorldAPI } from "./useWorldAPI";
import { act } from "react-dom/test-utils";

jest.mock("react-redux");
jest.mock("firebase_config");

describe("useWorldAPI", () => {
  beforeEach(() => {
    // selectorのレスポンスを設定する
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseData: GetWorldResponseType = {
      id: 1,
      name: "スクエアペイント",
      description: "真っ直ぐ歩くプログラムを書こう",
      movie_url: "http://sample.com/",
    };
    const url = `${uri}/worlds/1/`;
    mock.onGet(url).reply(200, mockResponseData); // モックAPIを定義
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("getWorldTestCommonCase", async () => {
    //実行
    const { result } = renderHook(() => useWorldAPI());
    expect(result.current.error).toEqual(undefined);
    await expect(result.current.getWorld(1)).resolves.toEqual({
      id: 1,
      name: "スクエアペイント",
      description: "真っ直ぐ歩くプログラムを書こう",
      movie_url: "http://sample.com/",
    });
  });
  test("getWorldTestErrorCase", async () => {
    //実行
    const { result, waitForNextUpdate } = renderHook(() => useWorldAPI());
    expect(result.current.error).toEqual(undefined);
    const getWorld = result.current.getWorld;
    act(() => {
      expect(() => getWorld(2)).rejects.toThrow(Error);
    });
    await waitForNextUpdate();
    expect(result.current.error).toEqual(
      "GetWorldResponseError Error: Request failed with status code 404"
    );
  });
});
