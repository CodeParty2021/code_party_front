import { renderHook, act } from "@testing-library/react-hooks";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAnonymousLoginFormState } from "./useAnonymousLoginFormState";

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
    const { result } = renderHook(() => useAnonymousLoginFormState());
    expect(result.current.anonymousLoginBtnDisabled).toEqual(false);
  });

  test("exec anonymousLoginBtnHandler", async () => {
    const { result } = renderHook(() => useAnonymousLoginFormState());
    const { anonymousLoginBtnHandler } = result.current;

    act(() => {
      anonymousLoginBtnHandler();
    });

    expect(result.current.anonymousLoginBtnDisabled).toEqual(true);
    expect(signInAnonymouslyMock).toHaveBeenCalled();
  });
});
