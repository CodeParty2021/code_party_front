import React from "react";
import { shallow } from "enzyme";
import { Load } from "./Load";
describe("<Load />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<Load />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
