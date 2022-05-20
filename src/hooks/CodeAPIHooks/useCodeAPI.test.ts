import { act, renderHook } from "@testing-library/react-hooks";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { useCodeAPI } from "./useCodeAPI";

import { uri } from "config";
import { axiosWithIdToken } from "axios_config";

describe("useCodeAPI", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getCodeの正常系テスト", async () => {
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseDeta = {
      id: "123",
      codeContent: "print('hello')",
      language: "python",
      updatedAt: "20220303",
      createdAt: "20220303",
      user: "teru",
      step: "1",
    };
    const url = `${uri}/codes/123/`;
    mock.onGet(url).reply(200, mockResponseDeta); // モックAPIを定義

    //実行
    const { result, waitForNextUpdate } = renderHook(() => useCodeAPI());
    const getCode = result.current.getCode;

    act(() => {
      const promise = getCode("123");
      promise.then((res) => {
        expect(res).toEqual({
          id: "123",
          codeContent: "print('hello')",
          language: "python",
          updatedAt: "20220303",
          createdAt: "20220303",
          user: "teru",
          step: "1",
        });
      });
    });

    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();

    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
  });

  test("updateCodeの正常系テスト", async () => {
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseDeta = {
      codeContent: "print('hello')",
      language: "python",
      step: "1",
    };
    const url = `${uri}/codes/123/`;
    mock.onPut(url).reply(200, mockResponseDeta); // モックAPIを定義

    //実行
    const { result, waitForNextUpdate } = renderHook(() => useCodeAPI());
    const updateCode = result.current.updateCode;

    act(() => {
      const promise = updateCode("123", "aaaa", "feaw", "1");
      promise.then((res) => {
        expect(res).toEqual({
          codeContent: "print('hello')",
          language: "python",
          step: "1",
        });
      });
    });

    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();

    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
  });

  test("createCodeの正常系テスト", async () => {
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseDeta = {
      id: "123",
      codeContent: "print('hello')",
      language: "python",
      updatedAt: "20220303",
      createdAt: "20220303",
      user: "teru",
      step: "1",
    };
    const url = `${uri}/codes`;
    mock.onPost(url).reply(200, mockResponseDeta); // モックAPIを定義

    //実行
    const { result, waitForNextUpdate } = renderHook(() => useCodeAPI());
    const createCode = result.current.createCode;

    act(() => {
      const promise = createCode("123", "aaaa", "feaw");
      promise.then((res) => {
        expect(res).toEqual({
          id: "123",
          codeContent: "print('hello')",
          language: "python",
          updatedAt: "20220303",
          createdAt: "20220303",
          user: "teru",
          step: "1",
        });
      });
    });

    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();

    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
  });

  test("testCodeの正常系テスト", async () => {
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseDeta = {
      unityURL: "string",
      jsonId: "string",
    };
    const url = `${uri}/codes/123/test`;
    mock.onGet(url).reply(200, mockResponseDeta); // モックAPIを定義

    //実行
    const { result, waitForNextUpdate } = renderHook(() => useCodeAPI());
    const testCode = result.current.testCode;

    act(() => {
      const promise = testCode("123");
      promise.then((res) => {
        expect(res).toEqual({
          unityURL: "string",
          jsonId: "string",
        });
      });
    });

    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();

    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
  });
});
