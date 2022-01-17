import React from "react";
import { shallow } from "enzyme";
import { StageDetail } from "./StageDetail";

describe("<StageDetail />", () => {
  it("Render StageDetail as undefined", () => {
    const wrapper = shallow(<StageDetail stage={undefined} />);
    //expect(wrapper.text()).toEqual("情報が見つかりませんでした．");
    expect(wrapper.getElements()).toMatchSnapshot();
  });
  it("Render StageDetail", () => {
    const stage = {
      id: 0,
      name: "テストステージ",
      stage_index: 3,
      rule: "テキストテスト",
    };
    const wrapper = shallow(<StageDetail stage={stage} />);
    //expect(wrapper.text()).toEqual("ID:0, NAME:テストステージ, index:3, rule:テキストテスト");
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
