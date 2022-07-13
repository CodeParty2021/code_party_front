import React from "react";
import { shallow } from "enzyme";
import { Lp } from "./Lp";
describe("<Lp />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<Lp />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
