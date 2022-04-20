import { renderHook } from "@testing-library/react-hooks";
import { Params, useNavigate, useParams } from "react-router-dom";

import { useCodingState } from "./useCodeHooks";
import { useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
jest.mock("react-router-dom");
jest.mock("react-unity-webgl");

const useNavigateMock = useNavigate as jest.Mock;

const useParamsMock = useParams as jest.Mock<Params<string>>;

jest.mock("hooks/CodeAPIHooks/useCodeAPI");
const useCodeHooksMock = useCodeAPI as jest.Mock;

let initialState = {
  loading: false,
  error: false,
  getCode: jest.fn(),
  updateCode: jest.fn(),
  createCode: jest.fn(),
  testCode: jest.fn(),
};

const navigateMock = jest.fn();

describe("useCodeHooksTest", () => {
  beforeEach(() => {
    // 各関数の戻り値設定
    initialState.getCode.mockReturnValue(
      new Promise((resolve) =>
        resolve({
          id: "123",
          codeContent: "print('hello')",
          language: "python",
          updatedAt: "20220303",
          createdAt: "20220303",
          user: "teru",
          step: "1",
        })
      )
    );
    initialState.updateCode.mockReturnValue(
      new Promise((resolve) =>
        resolve({
          codeContent: "print('hello')",
          language: "python",
          step: "1",
        })
      )
    );
    initialState.createCode.mockReturnValue({
      id: "123",
      codeContent: "print('hello')",
      language: "python",
      updatedAt: "20220303",
      createdAt: "20220303",
      user: "teru",
      step: "1",
    });

    initialState.testCode.mockReturnValue({
      unityURL: "string",
      jsonId: "string",
    });

    useCodeHooksMock.mockReturnValue({ ...initialState });

    useNavigateMock.mockReturnValue(navigateMock);
    useParamsMock.mockReturnValue({
      codeId: "123",
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCodingState());
    await waitForNextUpdate();
    expect(result.current.code).toEqual({
      id: "123",
      codeContent: "print('hello')",
      language: "python",
      updatedAt: "20220303",
      createdAt: "20220303",
      user: "teru",
      step: "1",
    });
    expect(result.current.error).toEqual(false);
    expect(result.current.loading).toEqual(false);
    expect(result.current.turnLog).toEqual([]); // execされるまではから
    expect(result.current.showUnity).toEqual(false); //コード実行されるまではfalse
  });

  it("test isCode", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCodingState());
    await waitForNextUpdate();

    const trueCode = {
      id: "123",
      codeContent: "print('hello')",
      language: "python",
      updatedAt: "20220303",
      createdAt: "20220303",
      user: "teru",
      step: "1",
    };
    expect(result.current.isCode(trueCode)).toEqual(true);
    expect(result.current.isCode(undefined)).toEqual(false);
  });

  it("test execCode", async () => {
    //TODO うまくかけなかったので断念...テスト書く
  });
});
