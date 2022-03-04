import React from "react";
import { shallow } from "enzyme";
import { CasualBattleWaitingRoom } from "./WaitingRoom";

describe("<CasualBattleWaitingRoom />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<CasualBattleWaitingRoom />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
