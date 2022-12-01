import { useIsCloseCMS } from "hooks/IsCloseCMSHooks/isCloseCMS";
import { useDispatch, useSelector } from "react-redux";
import { setCallBackToSyncUser } from "services/user/user";
import { renderHook } from "@testing-library/react-hooks";
import { useAppState } from "./useAppState";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

jest.mock("services/user/user");
const setCallBackToSyncUserMock = setCallBackToSyncUser as jest.Mock;

jest.mock("hooks/IsCloseCMSHooks/isCloseCMS");
const useIsCloseCMSMock = useIsCloseCMS as jest.Mock;

const getIsCloseMock = jest.fn();

describe("useAppState", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      state: {
        user: {
          unRegisterObserver: jest.fn(),
        },
      },
    });
    useDispatchMock.mockReturnValue(jest.fn());
    setCallBackToSyncUserMock.mockReturnValue(jest.fn());
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("IsCloseValue == true", async () => {
    getIsCloseMock.mockReturnValue(new Promise((resolve) => resolve(true)));
    useIsCloseCMSMock.mockReturnValue({
      getIsClose: getIsCloseMock,
    });
    const { result, waitForNextUpdate } = renderHook(() => useAppState());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isClose).toBe(true);
    expect(result.current.isDev).toBe(false);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isClose).toBe(true);
    expect(result.current.isDev).toBe(false);
  });
  test("IsCloseValue == false", async () => {
    getIsCloseMock.mockReturnValue(new Promise((resolve) => resolve(false)));
    useIsCloseCMSMock.mockReturnValue({
      getIsClose: getIsCloseMock,
    });
    const { result, waitForNextUpdate } = renderHook(() => useAppState());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isClose).toBe(true);
    expect(result.current.isDev).toBe(false);
    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isClose).toBe(false);
    expect(result.current.isDev).toBe(false);
  });
});
