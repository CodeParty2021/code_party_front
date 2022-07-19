import React from "react";
import { shallow } from "enzyme";
import { CasualBattlePickCode } from "./PickCode";

describe("<CasualBattlePickCode />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<CasualBattlePickCode />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
