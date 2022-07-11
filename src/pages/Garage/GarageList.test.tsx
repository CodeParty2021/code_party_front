import React from "react";
import { shallow } from "enzyme";
import { GarageList } from "./GarageList";
describe("<RobotDevelopmentTop />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(< GarageList/>);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});