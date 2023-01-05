import { CMSResponse, useIsCloseCMS } from "hooks/IsCloseCMSHooks/isCloseCMS";
import { axiosMicroCMS } from "axios_config";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { microCMSConfig } from "config";
import { renderHook } from "@testing-library/react-hooks";

describe("isCloseCMS", () => {
  beforeEach(() => {
    const axiosInstanceMock = new MockAdapter(axiosMicroCMS as AxiosInstance); // 型の関係上 as でAxiosInstanceにする
    const mockResponseData: CMSResponse = {
      createdAt: "2022-04-19T02:58:25.852Z",
      updatedAt: "2022-06-12T15:18:04.818Z",
      publishedAt: "2022-04-19T02:58:25.852Z",
      revisedAt: "2022-06-12T15:18:04.818Z",
      isClose: false,
    };
    const url = `${microCMSConfig.uri}/is-close`;
    axiosInstanceMock.onGet(url).reply(200, mockResponseData); // モックAPIを定義
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("正常系", async () => {
    const { result } = renderHook(() => useIsCloseCMS());
    const getIsClose = result.current.getIsClose;
    await expect(getIsClose()).resolves.toEqual(false);
  });
});
