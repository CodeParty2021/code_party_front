import React from "react";
import { shallow } from "enzyme";
import { Specification } from "./Specification";
describe("<Specification />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<Specification />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
