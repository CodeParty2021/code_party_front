import React from "react";
import { shallow } from "enzyme";
import { CasualBattleSearchRoom } from "./SearchRoom";

describe("<CasualBattleSearchRoom />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<CasualBattleSearchRoom />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
