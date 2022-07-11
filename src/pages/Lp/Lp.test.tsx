import React from "react";
import { shallow } from "enzyme";
import { Lp } from "./Lp";
describe("<Load />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<Lp />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
