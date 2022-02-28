import React from "react";
import { shallow } from "enzyme";
import { CasualBattleLobby } from "./Lobby";

describe("<CasualBattleLobby />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<CasualBattleLobby />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
