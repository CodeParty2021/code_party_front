import { renderHook } from "@testing-library/react-hooks";
import { useNavigate } from "react-router-dom";

import { useCodingState } from "./useCodeHooks";
import { useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";

jest.mock("react-router-dom");
const useNavigateMock = useNavigate as jest.Mock;

jest.mock("hooks/CodeAPIHooks/useCodeAPI");
const useCodeHooksMock = useCodeAPI as jest.Mock;

const initialState = {
  loading: false,
  error: false,
  getCode: jest.fn(),
  updateCode: jest.fn(),
  createCode: jest.fn(),
  testCode: jest.fn(),
};

const navigateMock = jest.fn();

describe("useWaitingRoomState", () => {
  beforeEach(() => {
    useCodeHooksMock.mockReturnValue({ ...initialState });
    useNavigateMock.mockReturnValue(navigateMock);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render", () => {
    const { result } = renderHook(() => useCodingState());
    console.log(result);
    //TODO: write test here
  });
});
