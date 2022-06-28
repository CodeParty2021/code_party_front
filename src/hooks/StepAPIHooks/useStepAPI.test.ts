import { renderHook } from "@testing-library/react-hooks";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { uri } from "config";
import { axiosWithIdToken } from "axios_config";
import { GetStepResponseType, useStepAPI } from "./useStepAPI";
import { act } from "react-dom/test-utils";

jest.mock("react-redux");
jest.mock("firebase_config");

describe("useStepAPI", () => {
  beforeEach(() => {
    // selectorのレスポンスを設定する
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseData: GetStepResponseType = {
      id: 1,
      objective: "真っ直ぐ歩くプログラムを書こう",
      description: "難しいよ",
      index: 1,
      stage: 1,
      option: {},
      opponents: [1, 2],
    };
    const url = `${uri}/steps/1/`;
    mock.onGet(url).reply(200, mockResponseData); // モックAPIを定義
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("getStepTestCommonCase", async () => {
    //実行
    const { result } = renderHook(() => useStepAPI());
    expect(result.current.error).toEqual(undefined);
    await expect(result.current.getStep(1)).resolves.toEqual({
      id: 1,
      objective: "真っ直ぐ歩くプログラムを書こう",
      description: "難しいよ",
      index: 1,
      stage: 1,
      option: {},
      opponents: [1, 2],
    });
  });
  test("getStepTestErrorCase", async () => {
    //実行
    const { result, waitForNextUpdate } = renderHook(() => useStepAPI());
    expect(result.current.error).toEqual(undefined);
    const getStep = result.current.getStep;
    act(() => {
      expect(() => getStep(2)).rejects.toThrow(Error);
    });
    await waitForNextUpdate();
    expect(result.current.error).toEqual(
      "GetStepResponseError Error: Request failed with status code 404"
    );
  });
});
