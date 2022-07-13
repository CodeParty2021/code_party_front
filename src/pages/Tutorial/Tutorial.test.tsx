import React from "react";
import { shallow } from "enzyme";
import { Tutorial } from "./Tutorial";
describe("<Tutorial />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<Tutorial />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
