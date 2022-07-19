import React from "react";
import { shallow } from "enzyme";
import { TutorialMissions } from "./TutorialMissions";
describe("<TutorialMissions />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<TutorialMissions />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
