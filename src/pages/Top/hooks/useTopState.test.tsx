import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import { useFisrtLoginTopState } from "./useTopState";
import { useNormalLoginTopState } from "./useTopState";
import { getAuth, signInAnonymously } from "firebase/auth";

jest.mock("firebase/auth");
jest.mock("react-router-dom");

const getAuthMock = getAuth as jest.Mock;
const signInAnonymouslyMock = signInAnonymously as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;

const navigateMock = jest.fn();

describe("useFisrtLoginForm", () => {
  beforeEach(() => {
    getAuthMock.mockReturnValue({});
    useNavigateMock.mockReturnValue(navigateMock);
    signInAnonymouslyMock.mockResolvedValue({});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("render", async () => {
    const { result } = renderHook(() => useFisrtLoginTopState());
    expect(result.current.FirstLoginBtnDisabled).toEqual(false);
  });

  test("exec FirstLoginBtnHandler", async () => {
    const { result } = renderHook(() => useFisrtLoginTopState());
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
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("render", async () => {
    const { result } = renderHook(() => useFisrtLoginTopState());
    expect(result.current.FirstLoginBtnDisabled).toEqual(false);
  });

  test("exec NormalLoginBtnHandler", async () => {
    const { result } = renderHook(() => useNormalLoginTopState());
    const { NormalLoginBtnHandler } = result.current;

    act(() => {
      NormalLoginBtnHandler();
    });

    expect(result.current.NormalLoginBtnDisabled).toEqual(true);
  });
});
