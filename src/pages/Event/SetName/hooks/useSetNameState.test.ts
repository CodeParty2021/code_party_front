import { renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import { useSetNameState } from "./useSetNameState";
jest.mock("react-redux");
jest.mock("react-router-dom");

const useNavigateMock = useNavigate as jest.Mock;

const navigateMock = jest.fn();

describe("useStartState", () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("ボタンクリックしたら遷移するか", () => {
    const { result } = renderHook(() => useSetNameState());

    const { startBtnHandler } = result.current;
    startBtnHandler();

    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).lastCalledWith("/event/select-mode");
  });
});
