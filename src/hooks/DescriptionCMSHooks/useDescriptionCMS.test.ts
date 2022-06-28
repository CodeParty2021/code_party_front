import { act, renderHook } from "@testing-library/react-hooks";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { microCMSConfig } from "config";
import { axiosMicroCMS } from "axios_config";
import { DescriptionCMSsType, useDescriptionCMS } from "./useDescriptionCMS";

import { useStageAPI } from "hooks/StageAPIHooks/useStageAPI";
import { useWorldAPI } from "hooks/WorldAPIHooks/useWorldAPI";
import { useStepAPI } from "hooks/StepAPIHooks/useStepAPI";

const mockUseWorldAPI = useWorldAPI as jest.Mock;
const mockUseStageAPI = useStageAPI as jest.Mock;
const mockUseStepAPI = useStepAPI as jest.Mock;
jest.mock("hooks/WorldAPIHooks/useWorldAPI");
jest.mock("hooks/StageAPIHooks/useStageAPI");
jest.mock("hooks/StepAPIHooks/useStepAPI");

jest.mock("react-redux");

const initialStageState = {
  error: undefined,
  getStage: jest.fn(),
};

const initialWorldState = {
  error: undefined,
  getWorld: jest.fn(),
};

const initialStepState = {
  error: undefined,
  getStep: jest.fn(),
};

describe("useDescriptionCMS", () => {
  beforeEach(() => {
    // selectorのレスポンスを設定する
    const mock = new MockAdapter(axiosMicroCMS as AxiosInstance);
    const mockResponseData: DescriptionCMSsType = {
      contents: [
        {
          id: "u3w7er2atby",
          createdAt: "2022-04-19T02:58:25.852Z",
          updatedAt: "2022-06-12T15:18:04.818Z",
          publishedAt: "2022-04-19T02:58:25.852Z",
          revisedAt: "2022-06-12T15:18:04.818Z",
          worldIndex: 1,
          stageIndex: 1,
          stepIndex: 1,
          body: [
            {
              fieldId: "body",
              html: '<h1 id="hc9f08a00f8">ステージ１</h1><p>次の画像のように動こう<br>&lt;table&gt;<br>&lt;tr&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;<br>&lt;/table&gt;<br><img src="https://images.microcms-assets.io/assets/4712ba13111f4c01bab9c344ae473307/40378f930361435f8596628bd0264402/blog-template-description3.png" alt=""></p>',
            },
            {
              fieldId: "hintBox",
              title: "ヒント、関数とは",
              body: '<h1 id="hb3ab3aee6b">関数とは</h1><p>関数はプログラムの塊</p><pre><code>function func(){\n  console.log(aaa)\n}</code></pre>',
            },
          ],
        },
      ],
      totalCount: 1,
      offset: 0,
      limit: 10,
    };
    const url = `${microCMSConfig.uri}/step-description?filters=worldIndex[equals]1[and]stageIndex[equals]1[and]stepIndex[equals]1`;
    mock.onGet(url).reply(200, mockResponseData); // モックAPIを定義
    const url2 = `${microCMSConfig.uri}/step-description?filters=worldIndex[equals]2[and]stageIndex[equals]2[and]stepIndex[equals]2`;
    mock.onGet(url2).reply(404, {}); // モックAPIを定義

    const getWorld = initialWorldState.getWorld;
    getWorld.mockReturnValue({
      id: 1,
      name: "スクエアペイント",
      description: "真っ直ぐ歩くプログラムを書こう",
      movie_url: "http://sample.com/",
    });
    mockUseWorldAPI.mockReturnValue(initialWorldState);

    initialStageState.getStage.mockReturnValue(
      new Promise((resolve) =>
        resolve({
          id: 1,
          objective: "真っ直ぐ歩くプログラムを書こう",
          movie_url: "http://sample.com/",
          index: 1,
          world: 1,
        })
      )
    );
    mockUseStageAPI.mockReturnValue(initialStageState);

    initialStepState.getStep.mockReturnValue(
      new Promise((resolve) =>
        resolve({
          id: 1,
          objective: "真っ直ぐ歩くプログラムを書こう",
          description: "難しいよ",
          index: 1,
          stage: 1,
          option: {},
          opponents: [1, 2],
        })
      )
    );
    mockUseStepAPI.mockReturnValue(initialStepState);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getDescriptionSuccessCase", async () => {
    //実行
    const { result } = renderHook(() => useDescriptionCMS());
    const getDescription = result.current.getDescription;

    expect(result.current.error).toEqual(undefined);
    await expect(getDescription(1, 1, 1)).resolves.toEqual({
      id: "u3w7er2atby",
      createdAt: "2022-04-19T02:58:25.852Z",
      updatedAt: "2022-06-12T15:18:04.818Z",
      publishedAt: "2022-04-19T02:58:25.852Z",
      revisedAt: "2022-06-12T15:18:04.818Z",
      worldIndex: 1,
      stageIndex: 1,
      stepIndex: 1,
      body: [
        {
          fieldId: "body",
          html: '<h1 id="hc9f08a00f8">ステージ１</h1><p>次の画像のように動こう<br>&lt;table&gt;<br>&lt;tr&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;<br>&lt;/table&gt;<br><img src="https://images.microcms-assets.io/assets/4712ba13111f4c01bab9c344ae473307/40378f930361435f8596628bd0264402/blog-template-description3.png" alt=""></p>',
        },
        {
          fieldId: "hintBox",
          title: "ヒント、関数とは",
          body: '<h1 id="hb3ab3aee6b">関数とは</h1><p>関数はプログラムの塊</p><pre><code>function func(){\n  console.log(aaa)\n}</code></pre>',
        },
      ],
    });
  });

  test("getDescriptionFromStepIDSuccessCase", async () => {
    //実行
    const { result } = renderHook(() => useDescriptionCMS());
    const getDescriptionFromStepID = result.current.getDescriptionFromStepID;

    expect(result.current.error).toEqual(undefined);
    await expect(getDescriptionFromStepID(1)).resolves.toEqual({
      id: "u3w7er2atby",
      createdAt: "2022-04-19T02:58:25.852Z",
      updatedAt: "2022-06-12T15:18:04.818Z",
      publishedAt: "2022-04-19T02:58:25.852Z",
      revisedAt: "2022-06-12T15:18:04.818Z",
      worldIndex: 1,
      stageIndex: 1,
      stepIndex: 1,
      body: [
        {
          fieldId: "body",
          html: '<h1 id="hc9f08a00f8">ステージ１</h1><p>次の画像のように動こう<br>&lt;table&gt;<br>&lt;tr&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;<br>&lt;/table&gt;<br><img src="https://images.microcms-assets.io/assets/4712ba13111f4c01bab9c344ae473307/40378f930361435f8596628bd0264402/blog-template-description3.png" alt=""></p>',
        },
        {
          fieldId: "hintBox",
          title: "ヒント、関数とは",
          body: '<h1 id="hb3ab3aee6b">関数とは</h1><p>関数はプログラムの塊</p><pre><code>function func(){\n  console.log(aaa)\n}</code></pre>',
        },
      ],
    });
  });
  test("TestDescriptionErrorCase", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDescriptionCMS());

    const getDescription = result.current.getDescription;
    expect(result.current.error).toEqual(undefined);
    act(() => {
      expect(() => getDescription(2, 2, 2)).rejects.toThrow(Error);
    });
    await waitForNextUpdate();
    expect(result.current.error).toEqual(
      "GetStepResponseError Error: Request failed with status code 404"
    );
  });

  test("TestWorldAPIandStageErrorCase", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDescriptionCMS());

    mockUseStageAPI.mockReturnValue({
      ...initialStageState,
      error: "StageAPI Error",
    });

    mockUseWorldAPI.mockReturnValue({
      ...initialWorldState,
      error: "WorldAPI Error",
    });
    const getDescription = result.current.getDescription;
    expect(result.current.error).toEqual(undefined);
    act(() => {
      expect(() => getDescription(2, 2, 2)).rejects.toThrow(Error);
    });
    await waitForNextUpdate();
    expect(result.current.error).toEqual(
      "GetStepResponseError Error: Request failed with status code 404, StageAPI Error, WorldAPI Error"
    );
  });
});
