import React from "react";
import { shallow } from "enzyme";
import { TutorialStep } from "./Step";
describe("<TutorialStep />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<TutorialStep />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
