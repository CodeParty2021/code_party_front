import React from "react";
import { shallow } from "enzyme";
import { Step } from "./Step";
describe("<Tutorial />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<Step />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
