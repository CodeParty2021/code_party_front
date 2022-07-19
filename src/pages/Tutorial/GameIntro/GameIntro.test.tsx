import React from "react";
import { shallow } from "enzyme";
import { GameIntro } from "./GameIntro";
describe("<GameIntro />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<GameIntro />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
