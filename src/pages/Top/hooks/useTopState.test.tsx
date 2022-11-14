import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import { useTopState } from "./useTopState";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useSelector } from "react-redux";

jest.mock("firebase/auth");
jest.mock("react-router-dom");
jest.mock("react-redux");

const getAuthMock = getAuth as jest.Mock;
const signInAnonymouslyMock = signInAnonymously as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useSelectorMock = useSelector as jest.Mock;

const navigateMock = jest.fn();

describe("useFisrtLoginForm", () => {
  beforeEach(() => {
    getAuthMock.mockReturnValue({});
    useNavigateMock.mockReturnValue(navigateMock);
    signInAnonymouslyMock.mockResolvedValue({});
    useSelectorMock.mockReturnValue({
      isLogin: true,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("render", async () => {
    const { result } = renderHook(() => useTopState());
    expect(result.current.FirstLoginBtnDisabled).toEqual(false);
  });

  test("exec FirstLoginBtnHandler", async () => {
    const { result } = renderHook(() => useTopState());
    const { FirstLoginBtnHandler } = result.current;

    act(() => {
      FirstLoginBtnHandler();
    });

    expect(result.current.FirstLoginBtnDisabled).toEqual(true);
    expect(signInAnonymouslyMock).toHaveBeenCalled();
  });
});

describe("useNormalLoginTopState", () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
    useSelectorMock.mockReturnValue({
      isLogin: true,
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("render", async () => {
    const { result } = renderHook(() => useTopState());
    expect(result.current.FirstLoginBtnDisabled).toEqual(false);
  });

  test("exec NormalLoginBtnHandler", async () => {
    const { result } = renderHook(() => useTopState());
    const { NormalLoginBtnHandler } = result.current;

    act(() => {
      NormalLoginBtnHandler();
    });

    expect(result.current.NormalLoginBtnDisabled).toEqual(true);
  });
});
