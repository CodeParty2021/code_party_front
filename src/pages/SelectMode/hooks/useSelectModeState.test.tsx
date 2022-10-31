import { renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";
import { useSelectModeState } from "./useSelectModeState";

jest.mock("react-router-dom");

const useNavigateMock = useNavigate as jest.Mock;

const navigateMock = jest.fn();

describe("useSelectModeState", () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock);
  });
  test("beginDevelopHandler", () => {
    const { result } = renderHook(() => useSelectModeState());
    result.current.beginDevelopHandler();
    expect(navigateMock).toHaveBeenCalledWith("/robot-development/top");
  });
  test("beginRoomMatchHandler", () => {
    const { result } = renderHook(() => useSelectModeState());
    result.current.beginRoomMatchHandler();
    expect(navigateMock).toHaveBeenCalledWith("/room-match");
  });
});
