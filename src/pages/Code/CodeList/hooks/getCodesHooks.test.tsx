// hooks/useCounter.spec.ts
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useSelector } from "react-redux";
import { LoginUserState } from "services/user/user";
import { useFetchCodes } from "./getCodesHooks";
import { useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { uri } from "config";
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
const navigateMock = jest.fn();

describe("useFetchCodes", () => {
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
      createCode: createCodeMock,
    });
    useNavigateMock.mockReturnValue(navigateMock);
  });

  test("正常系のテスト", async () => {
    const mock = new MockAdapter(axios);
    const mockResponseDeta = [
      {
        id: "123",
        codeContent: "print('hello')",
        language: "python",
        updatedAt: "20220303",
        createdAt: "20220303",
        user: "teru",
        step: "1",
      },
    ];
    const url = `${uri}/codes`;
    mock.onGet(url).reply(200, mockResponseDeta); // モックAPIを定義

    //実行
    const { result, waitForNextUpdate } = renderHook(() => useFetchCodes());
    expect(result.current.codes).toEqual([]);

    expect(result.current.error).toEqual(undefined);
    await waitForNextUpdate();
    expect(result.current.codes).toEqual([
      {
        id: "123",
        codeContent: "print('hello')",
        language: "python",
        updatedAt: "20220303",
        createdAt: "20220303",
        user: "teru",
        step: "1",
      },
    ]);
    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);
  });
  test("newCOdeButtonHandlerのテスト", async () => {
    createCodeMock.mockReturnValue(
      new Promise((resolve) => {
        return resolve({
          id: "123",
          codeContent: "print('hello')",
          language: "python",
          updatedAt: "20220303",
          createdAt: "20220303",
          user: "teru",
          step: "1",
        });
      })
    );
    const { result, waitForNextUpdate } = renderHook(() => useFetchCodes());
    await waitForNextUpdate();
    const newCodeButtonHandler = result.current.newCodeButtonHandler;
    await newCodeButtonHandler();
    expect(navigateMock).lastCalledWith("/free-coding/123/");
  });
});
