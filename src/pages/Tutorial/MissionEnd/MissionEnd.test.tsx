import React from "react";
import { shallow } from "enzyme";
import { MissionEnd } from "./MissionEnd";
describe("<MissionEnd />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<MissionEnd />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
