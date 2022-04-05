import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { useStartState } from "./useStartState";

jest.mock("react-redux");

const useSelectorMock = useSelector as jest.Mock;

describe("useStartState", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("正常系（isLogin=true）", async () => {
    useSelectorMock.mockReturnValue({
      isLogin: true,
    });
    const { result } = renderHook(() => useStartState());
    expect(result.current).toEqual({
      anonymousLoginFormDisplay: false,
      firebaseLoginFormDisplay: true,
    });
  });

  test("正常系（isLogin=false）", async () => {
    useSelectorMock.mockReturnValue({
      isLogin: false,
    });
    const { result } = renderHook(() => useStartState());
    expect(result.current).toEqual({
      anonymousLoginFormDisplay: true,
      firebaseLoginFormDisplay: true,
    });
  });
});
