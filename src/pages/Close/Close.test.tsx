import React from "react";
import { shallow } from "enzyme";
import { Close } from "./Close";
describe("<Close />", () => {
  it("close snapshot test", () => {
    const wrapper = shallow(<Close />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
