import { renderHook, act } from "@testing-library/react-hooks";
import { useFirebaseAuth } from "hooks/FirebaseAuthHooks/useFirebaseAuthHooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStartState } from "./useStartState";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/FirebaseAuthHooks/useFirebaseAuthHooks");

const useNavigateMock = useNavigate as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const useFirebaseAuthMock = useFirebaseAuth as jest.Mock;

// for testing purpose
const singInOfFirebaseMock = jest.fn();
const navigateMock = jest.fn();

describe("useStartState", () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
    useDispatchMock.mockReturnValue(jest.fn());
    useFirebaseAuthMock.mockReturnValue({
      signInOfFirebase: singInOfFirebaseMock,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("signInButtonsHandler 正常系", async () => {
    const { result } = renderHook(() => useStartState());
    singInOfFirebaseMock.mockReturnValue(Promise.resolve());

    const { signInButtonsHandler } = result.current;
    act(() => {
      signInButtonsHandler("twitter");
    });
    expect(result.current.loading).toBe(true);
    expect(result.current.algoMessage).toBe("ログイン方法を選んでね");
  });
  test("signInButtonsHandler 異常系", async () => {
    const { result } = renderHook(() => useStartState());
    singInOfFirebaseMock.mockReturnValue(Promise.reject());

    const { signInButtonsHandler } = result.current;
    await act(async () => {
      signInButtonsHandler("twitter");
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.algoMessage).toBe("ログインに失敗しました。");
  });
  test("backLinkButtonHandler 正常系", async () => {
    const { result } = renderHook(() => useStartState());
    const { backLinkButtonHandler } = result.current;
    act(() => {
      backLinkButtonHandler();
    });
    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).lastCalledWith("/", { replace: true });
  });
});
