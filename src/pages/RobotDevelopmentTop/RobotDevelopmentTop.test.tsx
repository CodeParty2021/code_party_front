import React from "react";
import { shallow } from "enzyme";
import { RobotDevelopmentTop } from "./RobotDevelopmentTop";
describe("<RobotDevelopmentTop />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(< RobotDevelopmentTop/>);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});