import React from "react";
import { shallow } from "enzyme";
import { CasualBattlePickMode } from "./PickMode";

describe("<ModeSelect />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<CasualBattlePickMode />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
