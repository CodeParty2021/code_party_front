import React from "react";
import { shallow } from "enzyme";
import { RobotDevelopmentTop } from "./Top";
describe("<RobotDevelopmentTop />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<RobotDevelopmentTop />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
