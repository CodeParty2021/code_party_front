import { renderHook, act } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import { useSetNameState } from "./useSetNameState";
import { useDispatch } from "react-redux";
import { useUserAPI } from "hooks/UserAPIHooks/userAPIHooks";
import { useRef } from "react";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("services/user/user", () => {
  const origial = jest.requireActual("services/user/user");
  const updateUserDisplayNameMock = jest.fn();
  return {
    ...origial,
    useRef: updateUserDisplayNameMock,
  };
});
jest.mock("hooks/UserAPIHooks/userAPIHooks");
jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

const useNavigateMock = useNavigate as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const navigateMock = jest.fn();
const useUserAPIMock = useUserAPI as jest.Mock;
const useRefMock = useRef as jest.Mock;
const updateDisplayNameMock = jest.fn();
describe("useStartState", () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
    useUserAPIMock.mockReturnValue({
      error: undefined,
      loading: false,
      updateDisplayName: updateDisplayNameMock,
    });
    useDispatchMock.mockReturnValue(jest.fn());
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("正常系のテスト", async () => {
    const mRef = { current: { value: "aaa" } };
    useRefMock.mockReturnValueOnce(mRef);
    updateDisplayNameMock.mockReturnValueOnce(
      new Promise((resolve) => resolve({ displayName: "aaa" }))
    );

    const { result } = renderHook(() => useSetNameState());
    const { startBtnHandler } = result.current;

    act(() => {
      startBtnHandler();
    });
    expect(useDispatchMock).toBeCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(undefined);
  });

  test("refに何も入っていないときはerrorを表示", async () => {
    const mRef = { current: { value: undefined } };
    useRefMock.mockReturnValueOnce(mRef);
    const { result } = renderHook(() => useSetNameState());
    const { startBtnHandler } = result.current;
    act(() => {
      startBtnHandler();
    });
    expect(result.current.error).toBe("値を入力してください");
  });
});
