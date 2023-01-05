import { renderHook, act } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { LoginUserState } from "services/user/user";
import { useCodeListState } from "./useCodeListState";
import { useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { useNavigate } from "react-router-dom";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("hooks/CodeAPIHooks/useCodeAPI");

//参考記事: https://zenn.dev/bom_shibuya/articles/5c3ae7745c5e94

const useSelectorMock = useSelector as jest.Mock<LoginUserState>;
const useCodeAPIMock = useCodeAPI as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
// jest mockの第一引数にモジュールを入れることでモジュールをmockできます

let createCodeMock = jest.fn();
let deleteCodeMock = jest.fn();
let getCodesFilterUserIdMock = jest.fn();
const navigateMock = jest.fn();

const codeSample1 = {
  id: "sample1",
  codeContent: "print('hello')",
  language: "python",
  updatedAt: "20220303",
  createdAt: "20220303",
  user: "teru",
  step: "1",
};

const codeSample2 = {
  id: "sample2",
  codeContent: "print('hello')",
  language: "python",
  updatedAt: "20220303",
  createdAt: "20220303",
  user: "teru",
  step: "1",
};

describe("useCodeListState", () => {
  beforeEach(() => {
    // selectorのレスポンスを設定する
    useSelectorMock.mockReturnValue({
      user: {
        id: "few",
        displayName: "ffawefae",
        email: "feaeafa@fafe.com",
        picture: "fewfawefaewf.png",
        jwt: "feefawef390urjfo",
        isAnonymous: false,
      },
      isLogin: false,
      unRegisterObserver: null,
      loading: false,
    });
    useCodeAPIMock.mockReturnValue({
      getCodesFilterUserId: getCodesFilterUserIdMock,
      createCode: createCodeMock,
      deleteCode: deleteCodeMock,
    });
    useNavigateMock.mockReturnValue(navigateMock);
    getCodesFilterUserIdMock.mockReturnValue(
      new Promise((resolve) => resolve([codeSample1, codeSample2]))
    );
  });

  test("正常系のテスト", async () => {
    //実行
    const { result, waitForNextUpdate } = renderHook(() => useCodeListState());
    expect(result.current.codes).toEqual([]);
    expect(result.current.error).toEqual(undefined);

    await waitForNextUpdate();
    expect(result.current.codes).toEqual([codeSample1, codeSample2]);
    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
  });

  test("newCodeButtonHandlerのテスト", async () => {
    createCodeMock.mockReturnValue(
      new Promise((resolve) => {
        return resolve(codeSample1);
      })
    );
    const { result, waitForNextUpdate } = renderHook(() => useCodeListState());
    await waitForNextUpdate();
    const newCodeButtonHandler = result.current.newCodeButtonHandler;
    await newCodeButtonHandler();
    expect(navigateMock).lastCalledWith("/free-coding/sample1/codes");
  });

  test("deleteCodeButtonHandlerのテスト", async () => {
    deleteCodeMock.mockReturnValue(
      new Promise((resolve) => {
        return resolve(undefined);
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useCodeListState());

    await waitForNextUpdate();

    expect(result.current.codes).toEqual([codeSample1, codeSample2]);
    const deleteHandler = result.current.deleteHandler;

    act(() => {
      deleteHandler("sample2");
    });

    await waitForNextUpdate();

    expect(result.current.codes).toEqual([codeSample1]); // #削除したのでからになる
  });
});
