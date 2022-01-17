import reducer, { update, clear, Stage, Stages } from "./StageAPI";

test("reducer of StageAPI", () => {
  //初期状態
  const previousState: Stages = {
    stageList: {
      0: {
        id: 0,
        name: "テストステージ1",
        stage_index: 10,
        rule: "テストテキスト1",
      },
    },
  };

  //追加するステージ
  const stages: Stage[] = [
    {
      id: 1,
      name: "テストステージ2",
      stage_index: 2,
      rule: "テストテキスト2",
    },
  ];

  //ステージを追加
  expect(reducer(previousState, update(stages))).toEqual({
    stageList: {
      0: {
        id: 0,
        name: "テストステージ1",
        stage_index: 10,
        rule: "テストテキスト1",
      },
      1: {
        id: 1,
        name: "テストステージ2",
        stage_index: 2,
        rule: "テストテキスト2",
      },
    },
  });

  //ステージリストをクリア
  expect(reducer(previousState, clear())).toEqual({ stageList: {} });
});
