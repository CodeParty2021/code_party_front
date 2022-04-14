import { act, renderHook } from "@testing-library/react-hooks";
import { axiosWithIdToken } from "axios_config";
import MockAdapter from "axios-mock-adapter";

import { uri } from "config";
import { AxiosInstance } from "axios";
import { useFetchJson } from "./useFetchJson";

jest.mock("firebase_config");

describe("useFetchJson", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("正常系のテスト", async () => {
    const mock = new MockAdapter(axiosWithIdToken as AxiosInstance);
    const mockResponseDeta = {
      players: [
        {
          icon: "https://lh3.googleusercontent.com/a/AATXAJwITaQOOvc--Tgr9d9vwIJEiKEikWEhFt-QbvLt=s96-c",
          name: "akihito ihara",
        },
        { icon: "sampe.java", name: "ROBOT" },
        {
          icon: "https://lh3.googleusercontent.com/a/AATXAJwITaQOOvc--Tgr9d9vwIJEiKEikWEhFt-QbvLt=s96-c",
          name: "akihito ihara",
        },
        {
          icon: "sampe.java",
          name: "ROBOT",
        },
      ],

      stage: {
        width: 5,
        height: 5,
        field: [
          0, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, 1, -1, -1, -1, 2,
        ],
        players: [
          { x: 0, y: 0, score: 1 },
          { x: 0, y: 4, score: 1 },
          { x: 4, y: 4, score: 1 },
          { x: 4, y: 0, score: 1 },
        ],
      },
      turn: [
        {
          field: [
            0, -1, -1, -1, 3, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, 1, -1, -1, -1, 2,
          ],
          players: [
            { x: 0, y: 0, state: 0, action: 0, score: 2, print: "" },
            { x: 0, y: 4, state: 0, action: 3, score: 1, print: "" },
            { x: 4, y: 4, state: 0, action: 0, score: 1, print: "" },
            { x: 4, y: 0, state: 0, action: 2, score: 1, print: "" },
          ],
        },
        {
          field: [
            0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, 1, -1, -1, -1, 2,
          ],
          players: [
            { x: 0, y: 1, state: 0, action: 0, score: 3, print: "" },
            { x: -1, y: 4, state: 3, action: 6, score: 1, print: "" },
            { x: 4, y: 5, state: 3, action: 6, score: 1, print: "" },
            { x: 4, y: -1, state: 3, action: 6, score: 1, print: "" },
          ],
        },
        {
          field: [
            0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 0, -1, -1, -1, -1, 0, -1, -1,
            -1, -1, 1, -1, -1, -1, 2,
          ],
          players: [
            { x: 0, y: 2, state: 0, action: 0, score: 4, print: "" },
            { x: -1, y: 4, state: 2, action: 6, score: 1, print: "" },
            { x: 4, y: 5, state: 2, action: 6, score: 1, print: "" },
            { x: 4, y: -1, state: 2, action: 6, score: 1, print: "" },
          ],
        },
        {
          field: [
            0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, -1, -1,
            -1, -1, 0, -1, 3, 2, 2,
          ],
          players: [
            { x: 0, y: 3, state: 0, action: 0, score: 4, print: "" },
            { x: 0, y: 2, state: 1, action: 6, score: 1, print: "" },
            { x: 3, y: 4, state: 1, action: 6, score: 2, print: "" },
            { x: 2, y: 4, state: 1, action: 6, score: 2, print: "" },
          ],
        },
        {
          field: [
            0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, -1, 3,
            -1, -1, 0, -1, 3, 2, 2,
          ],
          players: [
            { x: 0, y: 4, state: 0, action: 0, score: 4, print: "" },
            { x: 0, y: 2, state: 0, action: 3, score: 1, print: "" },
            { x: 3, y: 4, state: 0, action: 0, score: 2, print: "" },
            { x: 2, y: 4, state: 0, action: 2, score: 3, print: "" },
          ],
        },
        {
          field: [
            0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 1, -1, 3, -1, -1, 0, -1, 3, -1,
            -1, 0, -1, 3, 2, 2,
          ],
          players: [
            { x: 0, y: 5, state: 3, action: 6, score: 4, print: "" },
            { x: -1, y: 2, state: 3, action: 6, score: 1, print: "" },
            { x: 3, y: 5, state: 3, action: 6, score: 2, print: "" },
            { x: 2, y: 3, state: 0, action: 2, score: 4, print: "" },
          ],
        },
        {
          field: [
            0, -1, -1, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 0, -1, 3, -1,
            -1, 0, -1, 3, 2, 2,
          ],
          players: [
            { x: 0, y: 5, state: 2, action: 6, score: 4, print: "" },
            { x: -1, y: 2, state: 2, action: 6, score: 1, print: "" },
            { x: 3, y: 5, state: 2, action: 6, score: 2, print: "" },
            { x: 2, y: 2, state: 0, action: 2, score: 5, print: "" },
          ],
        },
        {
          field: [
            0, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 0, -1, 3, 1,
            -1, 0, -1, 0, 2, 2,
          ],
          players: [
            { x: 2, y: 4, state: 1, action: 6, score: 5, print: "" },
            { x: 3, y: 3, state: 1, action: 6, score: 2, print: "" },
            { x: 4, y: 4, state: 1, action: 6, score: 2, print: "" },
            { x: 2, y: 1, state: 0, action: 2, score: 5, print: "" },
          ],
        },
        {
          field: [
            0, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 0, -1, 1, 1,
            -1, 0, -1, 0, 2, 2,
          ],
          players: [
            { x: 2, y: 4, state: 0, action: 0, score: 5, print: "" },
            { x: 3, y: 3, state: 0, action: 3, score: 3, print: "" },
            { x: 4, y: 4, state: 0, action: 0, score: 2, print: "" },
            { x: 2, y: 0, state: 0, action: 2, score: 4, print: "" },
          ],
        },
        {
          field: [
            0, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 0, 1, 1, 1, -1,
            0, -1, 0, 2, 2,
          ],
          players: [
            { x: 2, y: 5, state: 3, action: 6, score: 5, print: "" },
            { x: 2, y: 3, state: 0, action: 3, score: 4, print: "" },
            { x: 4, y: 5, state: 3, action: 6, score: 2, print: "" },
            { x: 2, y: -1, state: 3, action: 6, score: 4, print: "" },
          ],
        },
        {
          field: [
            0, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 1, 1, 1, 1, -1,
            0, -1, 0, 2, 2,
          ],
          players: [
            { x: 2, y: 5, state: 2, action: 6, score: 4, print: "" },
            { x: 1, y: 3, state: 0, action: 3, score: 5, print: "" },
            { x: 4, y: 5, state: 2, action: 6, score: 2, print: "" },
            { x: 2, y: -1, state: 2, action: 6, score: 4, print: "" },
          ],
        },
        {
          field: [
            3, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 1, 1, 1, 1, 0,
            2, -1, 0, 2, 2,
          ],
          players: [
            { x: 4, y: 3, state: 1, action: 6, score: 3, print: "" },
            { x: 0, y: 3, state: 0, action: 3, score: 5, print: "" },
            { x: 0, y: 4, state: 1, action: 6, score: 3, print: "" },
            { x: 0, y: 0, state: 1, action: 6, score: 5, print: "" },
          ],
        },
        {
          field: [
            3, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 1, 1, 1, 1, 0,
            2, -1, 0, 2, 0,
          ],
          players: [
            { x: 4, y: 3, state: 0, action: 0, score: 4, print: "" },
            { x: -1, y: 3, state: 3, action: 6, score: 5, print: "" },
            { x: 0, y: 4, state: 0, action: 0, score: 2, print: "" },
            { x: 0, y: 0, state: 0, action: 2, score: 5, print: "" },
          ],
        },
        {
          field: [
            3, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 1, 1, 1, 1, 0,
            2, -1, 0, 2, 0,
          ],
          players: [
            { x: 4, y: 4, state: 0, action: 0, score: 4, print: "" },
            { x: -1, y: 3, state: 2, action: 6, score: 5, print: "" },
            { x: 0, y: 5, state: 3, action: 6, score: 2, print: "" },
            { x: 0, y: -1, state: 3, action: 6, score: 5, print: "" },
          ],
        },
        {
          field: [
            3, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, 1, 1, 1, 1, 1, 0,
            2, -1, 0, 2, 0,
          ],
          players: [
            { x: 4, y: 5, state: 3, action: 6, score: 4, print: "" },
            { x: 4, y: 2, state: 1, action: 6, score: 6, print: "" },
            { x: 0, y: 5, state: 2, action: 6, score: 2, print: "" },
            { x: 0, y: -1, state: 2, action: 6, score: 5, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, 1, 1, 1, 1, 1, 1, 0, 2,
            -1, 0, 3, 0,
          ],
          players: [
            { x: 4, y: 5, state: 2, action: 6, score: 4, print: "" },
            { x: 4, y: 2, state: 0, action: 3, score: 7, print: "" },
            { x: 1, y: 0, state: 1, action: 6, score: 2, print: "" },
            { x: 3, y: 4, state: 1, action: 6, score: 6, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, -1, 0, 0, 2, 3, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 3, 0, 2,
            -1, 0, 3, 0,
          ],
          players: [
            { x: 4, y: 0, state: 1, action: 6, score: 5, print: "" },
            { x: 3, y: 2, state: 0, action: 3, score: 7, print: "" },
            { x: 1, y: 0, state: 0, action: 0, score: 3, print: "" },
            { x: 3, y: 4, state: 0, action: 2, score: 5, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, -1, 0, 0, 2, 3, -1, 0, 1, 1, 1, 3, 1, 1, 1, 1, 3, 0, 2, -1,
            0, 3, 0,
          ],
          players: [
            { x: 4, y: 0, state: 0, action: 0, score: 6, print: "" },
            { x: 2, y: 2, state: 0, action: 3, score: 7, print: "" },
            { x: 1, y: 1, state: 0, action: 0, score: 3, print: "" },
            { x: 3, y: 3, state: 0, action: 2, score: 6, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, -1, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 2, -1,
            0, 3, 0,
          ],
          players: [
            { x: 4, y: 1, state: 0, action: 0, score: 7, print: "" },
            { x: 1, y: 2, state: 0, action: 3, score: 5, print: "" },
            { x: 1, y: 2, state: 0, action: 0, score: 4, print: "" },
            { x: 3, y: 2, state: 0, action: 2, score: 7, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 2, 2, 0,
            3, 0,
          ],
          players: [
            { x: 4, y: 2, state: 0, action: 0, score: 7, print: "" },
            { x: 0, y: 2, state: 0, action: 3, score: 5, print: "" },
            { x: 1, y: 3, state: 0, action: 0, score: 5, print: "" },
            { x: 3, y: 1, state: 0, action: 2, score: 8, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 2, 2, 0,
            3, 0,
          ],
          players: [
            { x: 4, y: 3, state: 0, action: 0, score: 7, print: "" },
            { x: -1, y: 2, state: 3, action: 6, score: 5, print: "" },
            { x: 1, y: 4, state: 0, action: 0, score: 5, print: "" },
            { x: 3, y: 0, state: 0, action: 2, score: 8, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 2, 2, 0,
            3, 0,
          ],
          players: [
            { x: 4, y: 4, state: 0, action: 0, score: 7, print: "" },
            { x: -1, y: 2, state: 2, action: 6, score: 5, print: "" },
            { x: 1, y: 5, state: 3, action: 6, score: 5, print: "" },
            { x: 3, y: -1, state: 3, action: 6, score: 8, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 1, 2, 0,
            3, 0,
          ],
          players: [
            { x: 4, y: 5, state: 3, action: 6, score: 7, print: "" },
            { x: 0, y: 4, state: 1, action: 6, score: 6, print: "" },
            { x: 1, y: 5, state: 2, action: 6, score: 4, print: "" },
            { x: 3, y: -1, state: 2, action: 6, score: 8, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 2, 1, 2, 1, 3, 3, 1, 2, 0,
            3, 0,
          ],
          players: [
            { x: 4, y: 5, state: 2, action: 6, score: 5, print: "" },
            { x: 0, y: 4, state: 0, action: 3, score: 6, print: "" },
            { x: 4, y: 2, state: 1, action: 6, score: 5, print: "" },
            { x: 4, y: 3, state: 1, action: 6, score: 9, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 2, 0,
            3, 0,
          ],
          players: [
            { x: 1, y: 3, state: 1, action: 6, score: 6, print: "" },
            { x: -1, y: 4, state: 3, action: 6, score: 6, print: "" },
            { x: 4, y: 2, state: 0, action: 0, score: 4, print: "" },
            { x: 4, y: 3, state: 0, action: 2, score: 9, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 0, 0, 2, 3, 3, 3, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 0, 0,
            3, 2,
          ],
          players: [
            { x: 1, y: 3, state: 0, action: 0, score: 5, print: "" },
            { x: -1, y: 4, state: 2, action: 6, score: 6, print: "" },
            { x: 4, y: 3, state: 0, action: 0, score: 4, print: "" },
            { x: 4, y: 2, state: 0, action: 2, score: 10, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 3, 0, 2, 3, 1, 3, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 0, 0,
            3, 2,
          ],
          players: [
            { x: 1, y: 4, state: 0, action: 0, score: 4, print: "" },
            { x: 3, y: 1, state: 1, action: 6, score: 7, print: "" },
            { x: 4, y: 4, state: 0, action: 0, score: 4, print: "" },
            { x: 4, y: 1, state: 0, action: 2, score: 10, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 3, 0, 2, 1, 1, 3, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 0, 0,
            3, 2,
          ],
          players: [
            { x: 1, y: 5, state: 3, action: 6, score: 4, print: "" },
            { x: 3, y: 1, state: 0, action: 3, score: 8, print: "" },
            { x: 4, y: 5, state: 3, action: 6, score: 4, print: "" },
            { x: 4, y: 0, state: 0, action: 2, score: 9, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 3, 0, 1, 1, 1, 3, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 0, 0,
            3, 2,
          ],
          players: [
            { x: 1, y: 5, state: 2, action: 6, score: 4, print: "" },
            { x: 2, y: 1, state: 0, action: 3, score: 9, print: "" },
            { x: 4, y: 5, state: 2, action: 6, score: 3, print: "" },
            { x: 4, y: -1, state: 3, action: 6, score: 9, print: "" },
          ],
        },
        {
          field: [
            3, 2, 3, 3, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 1, 0, 0, 3, 2, 1, 0, 0,
            3, 2,
          ],
          players: [
            { x: 2, y: 3, state: 1, action: 6, score: 4, print: "" },
            { x: 1, y: 1, state: 0, action: 3, score: 9, print: "" },
            { x: 1, y: 0, state: 1, action: 6, score: 3, print: "" },
            { x: 4, y: -1, state: 2, action: 6, score: 9, print: "" },
          ],
        },
      ],
      result: { scores: [4, 9, 3, 9], rank: [3, 1, 0, 2] },
    };
    const url = `${uri}/results/resultId/json`;
    mock.onGet(url).reply(200, mockResponseDeta); // モックAPIを定義

    //実行
    const { result, waitForNextUpdate } = renderHook(() => useFetchJson());
    const fetchJson = result.current.fetchJson;

    act(() => {
      fetchJson("resultId");
    });

    await waitForNextUpdate();

    expect(result.current.data).toEqual(
      JSON.stringify({
        players: [
          {
            icon: "https://lh3.googleusercontent.com/a/AATXAJwITaQOOvc--Tgr9d9vwIJEiKEikWEhFt-QbvLt=s96-c",
            name: "akihito ihara",
          },
          { icon: "sampe.java", name: "ROBOT" },
          {
            icon: "https://lh3.googleusercontent.com/a/AATXAJwITaQOOvc--Tgr9d9vwIJEiKEikWEhFt-QbvLt=s96-c",
            name: "akihito ihara",
          },
          {
            icon: "sampe.java",
            name: "ROBOT",
          },
        ],

        stage: {
          width: 5,
          height: 5,
          field: [
            0, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, 1, -1, -1, -1, 2,
          ],
          players: [
            { x: 0, y: 0, score: 1 },
            { x: 0, y: 4, score: 1 },
            { x: 4, y: 4, score: 1 },
            { x: 4, y: 0, score: 1 },
          ],
        },
        turn: [
          {
            field: [
              0, -1, -1, -1, 3, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
              -1, -1, -1, 1, -1, -1, -1, 2,
            ],
            players: [
              { x: 0, y: 0, state: 0, action: 0, score: 2, print: "" },
              { x: 0, y: 4, state: 0, action: 3, score: 1, print: "" },
              { x: 4, y: 4, state: 0, action: 0, score: 1, print: "" },
              { x: 4, y: 0, state: 0, action: 2, score: 1, print: "" },
            ],
          },
          {
            field: [
              0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1,
              -1, -1, -1, 1, -1, -1, -1, 2,
            ],
            players: [
              { x: 0, y: 1, state: 0, action: 0, score: 3, print: "" },
              { x: -1, y: 4, state: 3, action: 6, score: 1, print: "" },
              { x: 4, y: 5, state: 3, action: 6, score: 1, print: "" },
              { x: 4, y: -1, state: 3, action: 6, score: 1, print: "" },
            ],
          },
          {
            field: [
              0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 0, -1, -1, -1, -1, 0, -1, -1,
              -1, -1, 1, -1, -1, -1, 2,
            ],
            players: [
              { x: 0, y: 2, state: 0, action: 0, score: 4, print: "" },
              { x: -1, y: 4, state: 2, action: 6, score: 1, print: "" },
              { x: 4, y: 5, state: 2, action: 6, score: 1, print: "" },
              { x: 4, y: -1, state: 2, action: 6, score: 1, print: "" },
            ],
          },
          {
            field: [
              0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, -1, -1,
              -1, -1, 0, -1, 3, 2, 2,
            ],
            players: [
              { x: 0, y: 3, state: 0, action: 0, score: 4, print: "" },
              { x: 0, y: 2, state: 1, action: 6, score: 1, print: "" },
              { x: 3, y: 4, state: 1, action: 6, score: 2, print: "" },
              { x: 2, y: 4, state: 1, action: 6, score: 2, print: "" },
            ],
          },
          {
            field: [
              0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 1, -1, -1, -1, -1, 0, -1, 3,
              -1, -1, 0, -1, 3, 2, 2,
            ],
            players: [
              { x: 0, y: 4, state: 0, action: 0, score: 4, print: "" },
              { x: 0, y: 2, state: 0, action: 3, score: 1, print: "" },
              { x: 3, y: 4, state: 0, action: 0, score: 2, print: "" },
              { x: 2, y: 4, state: 0, action: 2, score: 3, print: "" },
            ],
          },
          {
            field: [
              0, -1, -1, -1, 3, 0, -1, -1, -1, -1, 1, -1, 3, -1, -1, 0, -1, 3,
              -1, -1, 0, -1, 3, 2, 2,
            ],
            players: [
              { x: 0, y: 5, state: 3, action: 6, score: 4, print: "" },
              { x: -1, y: 2, state: 3, action: 6, score: 1, print: "" },
              { x: 3, y: 5, state: 3, action: 6, score: 2, print: "" },
              { x: 2, y: 3, state: 0, action: 2, score: 4, print: "" },
            ],
          },
          {
            field: [
              0, -1, -1, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 0, -1, 3,
              -1, -1, 0, -1, 3, 2, 2,
            ],
            players: [
              { x: 0, y: 5, state: 2, action: 6, score: 4, print: "" },
              { x: -1, y: 2, state: 2, action: 6, score: 1, print: "" },
              { x: 3, y: 5, state: 2, action: 6, score: 2, print: "" },
              { x: 2, y: 2, state: 0, action: 2, score: 5, print: "" },
            ],
          },
          {
            field: [
              0, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 0, -1, 3, 1,
              -1, 0, -1, 0, 2, 2,
            ],
            players: [
              { x: 2, y: 4, state: 1, action: 6, score: 5, print: "" },
              { x: 3, y: 3, state: 1, action: 6, score: 2, print: "" },
              { x: 4, y: 4, state: 1, action: 6, score: 2, print: "" },
              { x: 2, y: 1, state: 0, action: 2, score: 5, print: "" },
            ],
          },
          {
            field: [
              0, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 0, -1, 1, 1,
              -1, 0, -1, 0, 2, 2,
            ],
            players: [
              { x: 2, y: 4, state: 0, action: 0, score: 5, print: "" },
              { x: 3, y: 3, state: 0, action: 3, score: 3, print: "" },
              { x: 4, y: 4, state: 0, action: 0, score: 2, print: "" },
              { x: 2, y: 0, state: 0, action: 2, score: 4, print: "" },
            ],
          },
          {
            field: [
              0, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 0, 1, 1, 1,
              -1, 0, -1, 0, 2, 2,
            ],
            players: [
              { x: 2, y: 5, state: 3, action: 6, score: 5, print: "" },
              { x: 2, y: 3, state: 0, action: 3, score: 4, print: "" },
              { x: 4, y: 5, state: 3, action: 6, score: 2, print: "" },
              { x: 2, y: -1, state: 3, action: 6, score: 4, print: "" },
            ],
          },
          {
            field: [
              0, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 1, 1, 1, 1,
              -1, 0, -1, 0, 2, 2,
            ],
            players: [
              { x: 2, y: 5, state: 2, action: 6, score: 4, print: "" },
              { x: 1, y: 3, state: 0, action: 3, score: 5, print: "" },
              { x: 4, y: 5, state: 2, action: 6, score: 2, print: "" },
              { x: 2, y: -1, state: 2, action: 6, score: 4, print: "" },
            ],
          },
          {
            field: [
              3, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 1, 1, 1, 1,
              0, 2, -1, 0, 2, 2,
            ],
            players: [
              { x: 4, y: 3, state: 1, action: 6, score: 3, print: "" },
              { x: 0, y: 3, state: 0, action: 3, score: 5, print: "" },
              { x: 0, y: 4, state: 1, action: 6, score: 3, print: "" },
              { x: 0, y: 0, state: 1, action: 6, score: 5, print: "" },
            ],
          },
          {
            field: [
              3, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 1, 1, 1, 1,
              0, 2, -1, 0, 2, 0,
            ],
            players: [
              { x: 4, y: 3, state: 0, action: 0, score: 4, print: "" },
              { x: -1, y: 3, state: 3, action: 6, score: 5, print: "" },
              { x: 0, y: 4, state: 0, action: 0, score: 2, print: "" },
              { x: 0, y: 0, state: 0, action: 2, score: 5, print: "" },
            ],
          },
          {
            field: [
              3, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, -1, 1, 1, 1, 1,
              0, 2, -1, 0, 2, 0,
            ],
            players: [
              { x: 4, y: 4, state: 0, action: 0, score: 4, print: "" },
              { x: -1, y: 3, state: 2, action: 6, score: 5, print: "" },
              { x: 0, y: 5, state: 3, action: 6, score: 2, print: "" },
              { x: 0, y: -1, state: 3, action: 6, score: 5, print: "" },
            ],
          },
          {
            field: [
              3, -1, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, -1, 1, 1, 1, 1, 1, 0,
              2, -1, 0, 2, 0,
            ],
            players: [
              { x: 4, y: 5, state: 3, action: 6, score: 4, print: "" },
              { x: 4, y: 2, state: 1, action: 6, score: 6, print: "" },
              { x: 0, y: 5, state: 2, action: 6, score: 2, print: "" },
              { x: 0, y: -1, state: 2, action: 6, score: 5, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, -1, 3, 0, -1, 3, -1, -1, 1, -1, 3, 1, 1, 1, 1, 1, 1, 0,
              2, -1, 0, 3, 0,
            ],
            players: [
              { x: 4, y: 5, state: 2, action: 6, score: 4, print: "" },
              { x: 4, y: 2, state: 0, action: 3, score: 7, print: "" },
              { x: 1, y: 0, state: 1, action: 6, score: 2, print: "" },
              { x: 3, y: 4, state: 1, action: 6, score: 6, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, -1, 0, 0, 2, 3, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 3, 0, 2,
              -1, 0, 3, 0,
            ],
            players: [
              { x: 4, y: 0, state: 1, action: 6, score: 5, print: "" },
              { x: 3, y: 2, state: 0, action: 3, score: 7, print: "" },
              { x: 1, y: 0, state: 0, action: 0, score: 3, print: "" },
              { x: 3, y: 4, state: 0, action: 2, score: 5, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, -1, 0, 0, 2, 3, -1, 0, 1, 1, 1, 3, 1, 1, 1, 1, 3, 0, 2,
              -1, 0, 3, 0,
            ],
            players: [
              { x: 4, y: 0, state: 0, action: 0, score: 6, print: "" },
              { x: 2, y: 2, state: 0, action: 3, score: 7, print: "" },
              { x: 1, y: 1, state: 0, action: 0, score: 3, print: "" },
              { x: 3, y: 3, state: 0, action: 2, score: 6, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, -1, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 2,
              -1, 0, 3, 0,
            ],
            players: [
              { x: 4, y: 1, state: 0, action: 0, score: 7, print: "" },
              { x: 1, y: 2, state: 0, action: 3, score: 5, print: "" },
              { x: 1, y: 2, state: 0, action: 0, score: 4, print: "" },
              { x: 3, y: 2, state: 0, action: 2, score: 7, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 2, 2,
              0, 3, 0,
            ],
            players: [
              { x: 4, y: 2, state: 0, action: 0, score: 7, print: "" },
              { x: 0, y: 2, state: 0, action: 3, score: 5, print: "" },
              { x: 1, y: 3, state: 0, action: 0, score: 5, print: "" },
              { x: 3, y: 1, state: 0, action: 2, score: 8, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 2, 2,
              0, 3, 0,
            ],
            players: [
              { x: 4, y: 3, state: 0, action: 0, score: 7, print: "" },
              { x: -1, y: 2, state: 3, action: 6, score: 5, print: "" },
              { x: 1, y: 4, state: 0, action: 0, score: 5, print: "" },
              { x: 3, y: 0, state: 0, action: 2, score: 8, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 2, 2,
              0, 3, 0,
            ],
            players: [
              { x: 4, y: 4, state: 0, action: 0, score: 7, print: "" },
              { x: -1, y: 2, state: 2, action: 6, score: 5, print: "" },
              { x: 1, y: 5, state: 3, action: 6, score: 5, print: "" },
              { x: 3, y: -1, state: 3, action: 6, score: 8, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 0, 1, 2, 1, 3, 0, 1, 2,
              0, 3, 0,
            ],
            players: [
              { x: 4, y: 5, state: 3, action: 6, score: 7, print: "" },
              { x: 0, y: 4, state: 1, action: 6, score: 6, print: "" },
              { x: 1, y: 5, state: 2, action: 6, score: 4, print: "" },
              { x: 3, y: -1, state: 2, action: 6, score: 8, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 2, 1, 2, 1, 3, 3, 1, 2,
              0, 3, 0,
            ],
            players: [
              { x: 4, y: 5, state: 2, action: 6, score: 5, print: "" },
              { x: 0, y: 4, state: 0, action: 3, score: 6, print: "" },
              { x: 4, y: 2, state: 1, action: 6, score: 5, print: "" },
              { x: 4, y: 3, state: 1, action: 6, score: 9, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 0, 0, 2, 3, 3, 0, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 2,
              0, 3, 0,
            ],
            players: [
              { x: 1, y: 3, state: 1, action: 6, score: 6, print: "" },
              { x: -1, y: 4, state: 3, action: 6, score: 6, print: "" },
              { x: 4, y: 2, state: 0, action: 0, score: 4, print: "" },
              { x: 4, y: 3, state: 0, action: 2, score: 9, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 0, 0, 2, 3, 3, 3, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 0,
              0, 3, 2,
            ],
            players: [
              { x: 1, y: 3, state: 0, action: 0, score: 5, print: "" },
              { x: -1, y: 4, state: 2, action: 6, score: 6, print: "" },
              { x: 4, y: 3, state: 0, action: 0, score: 4, print: "" },
              { x: 4, y: 2, state: 0, action: 2, score: 10, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 3, 0, 2, 3, 1, 3, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 0,
              0, 3, 2,
            ],
            players: [
              { x: 1, y: 4, state: 0, action: 0, score: 4, print: "" },
              { x: 3, y: 1, state: 1, action: 6, score: 7, print: "" },
              { x: 4, y: 4, state: 0, action: 0, score: 4, print: "" },
              { x: 4, y: 1, state: 0, action: 2, score: 10, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 3, 0, 2, 1, 1, 3, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 0,
              0, 3, 2,
            ],
            players: [
              { x: 1, y: 5, state: 3, action: 6, score: 4, print: "" },
              { x: 3, y: 1, state: 0, action: 3, score: 8, print: "" },
              { x: 4, y: 5, state: 3, action: 6, score: 4, print: "" },
              { x: 4, y: 0, state: 0, action: 2, score: 9, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 3, 0, 1, 1, 1, 3, 1, 1, 1, 3, 3, 1, 0, 1, 3, 2, 1, 0,
              0, 3, 2,
            ],
            players: [
              { x: 1, y: 5, state: 2, action: 6, score: 4, print: "" },
              { x: 2, y: 1, state: 0, action: 3, score: 9, print: "" },
              { x: 4, y: 5, state: 2, action: 6, score: 3, print: "" },
              { x: 4, y: -1, state: 3, action: 6, score: 9, print: "" },
            ],
          },
          {
            field: [
              3, 2, 3, 3, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 1, 0, 0, 3, 2, 1, 0,
              0, 3, 2,
            ],
            players: [
              { x: 2, y: 3, state: 1, action: 6, score: 4, print: "" },
              { x: 1, y: 1, state: 0, action: 3, score: 9, print: "" },
              { x: 1, y: 0, state: 1, action: 6, score: 3, print: "" },
              { x: 4, y: -1, state: 2, action: 6, score: 9, print: "" },
            ],
          },
        ],
        result: { scores: [4, 9, 3, 9], rank: [3, 1, 0, 2] },
      })
    );
    expect(result.current.error).toEqual(undefined);
    expect(result.current.loading).toEqual(false);

    expect(mock.history["get"][0].url).toEqual("/results/resultId/json");
  });
});
