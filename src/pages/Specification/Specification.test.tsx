import React from "react";
import { shallow } from "enzyme";
import { Specification } from "./Specification";
describe("<RobotDevelopmentTop />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(< Specification/>);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});