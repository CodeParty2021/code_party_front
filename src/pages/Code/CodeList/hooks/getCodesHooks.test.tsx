// hooks/useCounter.spec.ts
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useSelector } from "react-redux";
import { UserState } from "services/user/user";
import { useFetchCodes } from "./getCodesHooks";

import { uri } from "config";

jest.mock("react-redux");
jest.mock("react-router-dom");

//参考記事: https://zenn.dev/bom_shibuya/articles/5c3ae7745c5e94

const useSelectorMock = useSelector as jest.Mock<UserState>;

// jest mockの第一引数にモジュールを入れることでモジュールをmockできます

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
      },
      isLogin: false,
      unRegisterObserver: null,
    });
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
    expect(result.current.data).toEqual(null);

    expect(result.current.error).toEqual(null);
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();
    expect(result.current.data).toEqual([
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
    expect(result.current.error).toEqual(null);
    expect(result.current.loading).toEqual(false);
  });
});
