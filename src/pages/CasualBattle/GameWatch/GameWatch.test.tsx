import React from "react";
import { shallow } from "enzyme";
import { CasualBattleGameWatch } from "./GameWatch";

describe("<CasualBattleLobby />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<CasualBattleGameWatch />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
