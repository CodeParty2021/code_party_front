import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import { useTopState } from "./useTopState";
import { getAuth, signInAnonymously } from "firebase/auth";

jest.mock("firebase/auth");
jest.mock("react-router-dom");

const getAuthMock = getAuth as jest.Mock;
const signInAnonymouslyMock = signInAnonymously as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;

const navigateMock = jest.fn();

describe("useAnonymousLoginForm", () => {
  beforeEach(() => {
    getAuthMock.mockReturnValue({});
    useNavigateMock.mockReturnValue(navigateMock);
    signInAnonymouslyMock.mockResolvedValue({});
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("render", async () => {
    const { result } = renderHook(() => useTopState());
    expect(result.current.anonymousLoginBtnDisabled).toEqual(false);
  });

  test("exec anonymousLoginBtnHandler", async () => {
    const { result } = renderHook(() => useTopState());
    const { anonymousLoginBtnHandler } = result.current;

    act(() => {
      anonymousLoginBtnHandler();
    });

    expect(result.current.anonymousLoginBtnDisabled).toEqual(true);
    expect(signInAnonymouslyMock).toHaveBeenCalled();
  });
});
