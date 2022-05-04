import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { useSelectModeState } from "./useSelectModeState";
jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/CodeAPIHooks/useCodeAPI");

const useSelectorMock = useSelector as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const useCodeAPIMock = useCodeAPI as jest.Mock;

const navigateMock = jest.fn();

const initialUseCodeAPIState = {
  loading: false,
  error: undefined,
  createCode: jest.fn(),
  getCodesFilterStepIdAndUserId: jest.fn(),
};

describe("useSelectModeState", () => {
  beforeEach(() => {
    useCodeAPIMock.mockReturnValue({ ...initialUseCodeAPIState });
    useSelectorMock.mockReturnValue({
      user: {
        id: "userid1",
        displayName: "ffawefae",
        email: "feaeafa@fafe.com",
        picture: "fewfawefaewf.png",
        jwt: "feefawef390urjfo",
      },
      isLogin: false,
      unRegisterObserver: null,
    });
    useNavigateMock.mockReturnValue(navigateMock);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("該当ステップにユーザのコードが存在している時、そのIDでnavigateする", async () => {
    const apiState = initialUseCodeAPIState;
    apiState.getCodesFilterStepIdAndUserId.mockReturnValue([
      {
        id: "123",
        codeContent: "print('hello');",
        language: "1",
        updatedAt: "20220303",
        createdAt: "20220303",
        user: "userid1",
        step: "2",
      },
    ]);

    const { result } = renderHook(() => useSelectModeState());

    const { beginTrainHandler } = result.current;
    await beginTrainHandler();
    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).lastCalledWith("/free-coding/123/");
  });
  test("該当ステップにユーザのコードが存在していないとき、新しくcodeを生成してそのIDでnavigateする", async () => {
    const apiState = initialUseCodeAPIState;
    apiState.getCodesFilterStepIdAndUserId.mockReturnValue([]); //該当なし時はから配列が帰る
    apiState.createCode.mockReturnValue({
      id: "123",
      codeContent: "print('hello');",
      language: "1",
      updatedAt: "20220303",
      createdAt: "20220303",
      user: "userid1",
      step: "2",
    });

    const { result } = renderHook(() => useSelectModeState());

    const { beginTrainHandler } = result.current;
    await beginTrainHandler();
    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).lastCalledWith("/free-coding/123/");
  });
});
