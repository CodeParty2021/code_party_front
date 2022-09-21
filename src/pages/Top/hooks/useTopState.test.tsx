import { act, renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import { useFisrtLoginTopState } from "./useTopState";
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
    const { result } = renderHook(() => useFisrtLoginTopState());
    expect(result.current.FirstLoginBtnDisabled).toEqual(false);
  });

  test("exec anonymousLoginBtnHandler", async () => {
    const { result } = renderHook(() => useFisrtLoginTopState());
    const { FirstLoginBtnHandler } = result.current;

    act(() => {
      FirstLoginBtnHandler();
    });

    expect(result.current.FirstLoginBtnDisabled).toEqual(true);
    expect(signInAnonymouslyMock).toHaveBeenCalled();
  });
});